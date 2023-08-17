import React from "react";

import { backgroundColor } from "mdb-react-ui-kit/dist/types/types/colors";

export const enum Statuses {
  SignIn = "SignIn",
  SignUp = "SignUp",
  Forgot = "Forgot",
  Reset = "Reset",
}

const get_status_color = (status: string): backgroundColor => {
  if (status === "In progress") {
    return "primary";
  } else if (status === "Completed") {
    return "success";
  } else if (status === "Canceled") {
    return "light";
  } else {
    return "dark";
  }
};

const get_priority_color = (priority: string): backgroundColor => {
  if (priority === "High") {
    return "danger";
  } else if (priority === "Medium") {
    return "warning";
  } else {
    return "info";
  }
};

const Task = ({ task }) => {
  return (
    <tr>
      <td className="fw-bold mb-1">{task["info"]}</td>
      <td>
        <MDBBadge pill color={get_status_color(task["status"])}>
          {task["status"]}
        </MDBBadge>
      </td>
      <td>
        <MDBBadge pill color={get_priority_color(task["priority"])}>
          {task["priority"]}
        </MDBBadge>
      </td>
      <td>{task["expired_time"]}</td>
      <td>{task["created_at"]}</td>
      <td>
        <MDBBtn color="link" rounded size="sm">
          Edit
        </MDBBtn>
        <MDBBtn color="link" rounded size="sm">
          Delete
        </MDBBtn>
      </td>
    </tr>
  );
};

export default Task;
