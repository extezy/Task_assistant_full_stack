import React, { useContext, useState } from "react";
import { AuthService } from "../../services/auth.service";
import { MDBCardBody, MDBInput, MDBIcon, MDBCol } from "mdb-react-ui-kit";
import { AuthComponentContext, Components } from "../providers/AuthComponentProvider";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { authState, setAuthState } = useContext(AuthComponentContext);

  const handleSubmit = async (_: React.MouseEvent) => {
    // Password confirmation validation
    if (password !== passwordConfirmation) setError("Passwords do not match");
    else {
      setError("");
      try {
        const data = await AuthService.signup(
          email,
          password,
          passwordConfirmation
        );
        console.log({data})

        // if (data) {
        //   history.push("/");
        // }
      } catch (err) {
        if (err instanceof Error) {
          // handle errors thrown from frontend
          setError(err.message);
        } else {
          // handle errors thrown from backend
          setError(String(err));
        }
      }
    }
  };

  return (
    <MDBCol md="6">
      <MDBCardBody className="d-flex flex-column">
        <div className="d-flex flex-row mt-1">
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
        </div>
        <h2 className="fw-bold mb-2">Sign up now</h2>

        <MDBInput
          wrapperClass="mb-1"
          label="Email address"
          id="email"
          type="email"
          size="lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-1"
          label="Password"
          id="password"
          type="password"
          size="lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <MDBInput
          wrapperClass="mb-1"
          label="Confirm password"
          id="passwordConfirmation"
          type="password"
          size="lg"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <button
          className="btn btn-dark mb-1 px-5"
          color="dark"
          onClick={async () => {
            await AuthService.signup(
              email,
              password,
              passwordConfirmation
            );;
          }}
        >
          Sign Up
        </button>
        <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
          or
          <button
            className="btn btn-link"
            style={{ color: "#393f81" }}
            onClick={() => {
              setAuthState(Components.SignIn);
            }}
            >Sign In</button>
        </p>
      </MDBCardBody>
    </MDBCol>
  );
};

export default SignUp;
