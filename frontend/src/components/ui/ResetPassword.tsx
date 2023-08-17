import { useState, useContext } from "react";
import { AuthService } from "../../services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MDBCardBody, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { AuthComponentContext } from "../providers/AuthComponentProvider";
import { Components } from "../providers/AuthComponentProvider";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const { authState, setAuthState } = useContext(AuthComponentContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate =  useNavigate()

  return (
    <MDBCol md="6">
      <MDBCardBody className="d-flex flex-column">
        <div className="d-flex flex-row mt-2">
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
          <span className="h1 mb-3 fw-bold">Enter new password</span>
        </div>
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
          label="Password Confirm"
          id="passwordConfirmation"
          type="password"
          size="lg"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        {/* TODO message or answer */}
        <button
          className="btn btn-dark mb-1 px-5 lg"
          color="dark"
          onClick={async () => {
            await AuthService.reset(password, token);
            alert("Password changed")
            setAuthState(Components.SignIn)
            navigate("/auth");
          }}
        >
          Confirm
        </button>
        {/* <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                <button
                  className="btn btn-link"
                  style={{ color: "#393f81" }}
                  onClick={() => {
                    setAuthState("signin");
                  }}
                >
                  Sign In
                </button>
              </p>
              or
              <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                <button
                  className="btn btn-link"
                  style={{ color: "#393f81" }}
                  onClick={() => {
                    setAuthState("signup");
                  }}
                >
                  Register here
                </button>
              </p> */}
      </MDBCardBody>
    </MDBCol>
  );
};

export default ResetPassword;
