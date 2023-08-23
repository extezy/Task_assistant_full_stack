import axios from "axios";
import { Task } from "../components/screens/task/Tasks";

// TODO address
const Url = "http://localhost:8000/api/task/";

// Service for CRUD Tasks
export const TasksService = {
  // GET all tasks
  async get_all(): Promise<any> {
    const token = localStorage.getItem("memo-assistant");

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try{
      const response = await axios.get(Url, config);
      return response.data;
    } catch (exx: any) {
      console.log(exx)
      return exx.response.status
    }
    
  },

  // GET one
  async get_one(id:any): Promise<any> {
    const token = localStorage.getItem("memo-assistant");

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try{
      const response = await axios.get(Url + `/${id}`, config);
      return response.data;
    } catch (exx: any) {
      console.log(exx)
      return exx.response.status
    }
    
  },

  // DELETE task by id
  async delete(task_id: string) {
    const token = localStorage.getItem("memo-assistant");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.delete(Url + task_id, config);
      return response;
    } catch (exx){
      console.log(exx)
      return null;
    }
  },

  // PUT task by id
  async put(task: Task) {
    const token = localStorage.getItem("memo-assistant");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(Url + task.id, task, config);

      return response;
    } catch (exx){
      console.log(exx)
      return null;
    }
  },

  // POST task
  async post(task: Task) {
    const token = localStorage.getItem("memo-assistant");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // TODO can change to dynamical body values?
    let body
    if (task.expired_time === "") {
      body = {
        info: task.info === "" ? null : task.info,
        status: task.status,
        priority: task.priority,
      };
    } else {
      body = {
        info: task.info === "" ? null : task.info,
        expired_time: task.expired_time,
        status: task.status,
        priority: task.priority,
      };
    }

    try {
      const response = await axios.post(Url, body, config);

      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

};
