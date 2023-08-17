import axios from "axios";

// Сервис для запроса данных с сервера
export const AuthService = {
  async signin(username: string, password: string) {
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      {
        username: username,
        password: password,
      },
      config
    );

    localStorage.setItem("memo-assistant", response.data.access_token);

    return response.data;
  },

  async signup(email: string, password: string, passwordConfirmation: string) {
    // Assert email or password or password confirmation is not empty
    if (!(email.length > 0)) {
      throw new Error("Email was not provided");
    }
    if (!(password.length > 0)) {
      throw new Error("Password was not provided");
    }
    if (!(passwordConfirmation.length > 0)) {
      throw new Error("Password confirmation was not provided");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        email: email,
        password: password,
      },
      config
    );

    // TODO check this block
    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    if (response.status > 400 && response.status < 500) {
      throw response.data;
    }

    return response.data;
  },

  async logout() {
    const response = await axios.post(
      "http://localhost:8000/api/auth/logout"
    );
    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    if (response.status == 204) {
      throw new Error("No Content");
    }

    if (response.status > 400 && response.status < 500) {
      throw response.data;
    }
  },

  async forgot(email: string) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/auth/forgot-password",
      {
        email: email,
      },
      config
    );
    console.log(response);
  },

  async reset(password: string, token: string) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:8000/api/auth/reset-password",
      {
        password: password,
        token: token,
      },
      config
    );

    // TODO check this block
    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    if (response.status > 400 && response.status < 500) {
      throw response.data;
    }

    return response.data;
  },
};
