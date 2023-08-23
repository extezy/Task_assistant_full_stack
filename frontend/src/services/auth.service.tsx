import axios from "axios";


const Url = "http://localhost:8000/api/auth/";

// Сервис для запроса данных с сервера
export const AuthService = {
  async signin(username: string, password: string) {
    const config = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(
      Url + "login",
      {
        username: username,
        password: password,
      },
      config
    );

    localStorage.setItem("memo-assistant", response.data.access_token);
    // localStorage.setItem("memo-assistant_expired", response.data.expired_in);

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
      Url + "register",
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

    const token = localStorage.getItem("memo-assistant");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(Url + "logout",[],config);
    } catch {
      return null;
    }
    localStorage.removeItem("memo-assistant")
  },

  async forgot(email: string) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      Url + "forgot-password",
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
      Url + "reset-password",
      {
        password: password,
        token: token,
      },
      config
    );

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    if (response.status > 400 && response.status < 500) {
      throw response.data;
    }

    return response.data;
  },
};
