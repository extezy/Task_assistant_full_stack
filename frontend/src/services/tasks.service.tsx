import axios from "axios";


// Service for CRUD Tasks
export const TasksService = {

  async get_all(): Promise<any> {
    // Get all tasks
    const token = localStorage.getItem("memo-assistant");
    if (!token){
        return  {"detail": 'Unauthorized'};
    }
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios
      .get("http://localhost:8000/api/task/", config)
      .catch((error) => {
        return error.response
      })
      .then(function (response) {
        if (response) {
          return response.data;
        }
      });

    return response
  },

  async delete(task_id: string) {
    // Delete task by id
    const token = localStorage.getItem("memo-assistant");
    if (!token){
        return  {"detail": 'Unauthorized'};
    }
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/task/${task_id}`,
        config
      );
      return response.data;
    } catch {
      return null;
    }
  },
};
