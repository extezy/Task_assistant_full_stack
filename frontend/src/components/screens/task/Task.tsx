import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate } from "react-router-dom";
import { TasksService } from "../../../services/tasks.service";

export type Task = {
  id: string;
  info: string;
  created_at: string;
  expired_time: string;
  status: string;
  priority: string;
};

const Task = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>();

  const params = useParams();
  const task_id = params.id;

  useEffect(() => {
    const getData = async () => {
      await TasksService.get_one(task_id)
        .then((result) => {
          setTask(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  return (
    <div className="container ">
      <h4 className="row d-grid mt-4 gap-2 d-md-flex justify-content-md-center">Task_id: {task?.id}</h4>
      <ListGroup className="list-group">
        <ListGroup.Item>Info: {task?.info}</ListGroup.Item>
        <ListGroup.Item>Created: {task?.created_at}</ListGroup.Item>
        <ListGroup.Item>Expired: {task?.expired_time}</ListGroup.Item>
        <ListGroup.Item>Priority: {task?.priority}</ListGroup.Item>
        <ListGroup.Item>Status: {task?.status}</ListGroup.Item>
      </ListGroup>
      <button className="btn btn-link" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Task;
