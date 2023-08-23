import React, { useCallback, useMemo, useState, useEffect } from "react";
import { TasksService } from "../../../services/tasks.service";
import { useNavigate } from "react-router-dom";
import { Task } from "./Task";

import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Checkbox,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import { AuthService } from "../../../services/auth.service";
// import { data, states } from "./makeData";

const Tasks = () => {
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await TasksService.get_all()
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => {
          if (error === 401) {
            localStorage.removeItem("memo-assistant");
            navigate("/auth");
          }
        });
    };
    getData();
  }, []);

  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: Task) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Task>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        // tableData[row.index] = values;
        //send/receive api updates here, then refetch or update local table data for re-render
        const response = await TasksService.put(values);
        // const new_values = TasksService.put(tableData[row.index]);
        if (response?.data?.status == 200) {
          tableData[row.index] = values;
        }
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Task>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("info")}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      TasksService.delete(row.getValue("id"));
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Task>
    ): MRT_ColumnDef<Task>["muiTableBodyCellEditTextFieldProps"] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "status"
              ? validateStatus(event.target.value)
              : cell.column.id === "priority"
              ? validatePriority(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 140,
      },
      {
        accessorKey: "info",
        header: "Info",
        enableColumnOrdering: false,
        enableEditing: true,
        enableSorting: false,
        size: 140,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        enableSorting: false,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        enableSorting: true,
      },
      {
        accessorKey: "created_at",
        header: "Created at",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          //   type: "date",
        }),
      },
      {
        accessorKey: "expired_time",
        header: "Expired at",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          //   type: "number",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <div className="container">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn btn-outline-info mb-1 mt-1 px-5 btn-sm"
          color="dark"
          onClick={async () => {
            const response = await AuthService.logout();
            navigate("/auth");
          }}
        >
          Logout
        </button>
      </div>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        initialState={{ columnVisibility: { id: false } }}
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Detail">
              <IconButton
                color="error"
                onClick={() => {
                  navigate(`/task/${row.getValue("id")}`);
                }}
              >
                <Search />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Task
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </div>
  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<Task>[];
  onClose: () => void;
  onSubmit: (values: Task) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const handleSubmit = () => {
    //put your validation logic here
    const response = TasksService.post(values);
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateStatus = (status: string) =>
  !!status.length &&
  ["In progress", "Canceled", "Complited", "Expired"].includes(
    status
  );

const validatePriority = (priority: string) =>
  !!priority.length &&
  ["High", "Medium", "Low"].includes(priority);

export default Tasks;
