import { useState, useContext } from "react";
import { AuthService } from "../../services/auth.service";
import { MDBCardBody, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { AuthComponentContext } from "../providers/AuthComponentProvider";
import { Components } from "../providers/AuthComponentProvider";


const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const { authState, setAuthState } = useContext(AuthComponentContext);

  return (
    <MDBCol md="6">
      <MDBCardBody className="d-flex flex-column">
        <div className="d-flex flex-row mt-2">
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
          <span className="h1 fw-bold">Memo Assistant</span>
        </div>

        <h6 className="fw-normal mb-1 my-1 pb-4" style={{ letterSpacing: "1px" }}>
          Reset password
        </h6>

        <MDBInput
          wrapperClass="mb-1"
          label="Email address"
          id="email"
          type="email"
          size="lg"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* TODO message or answer */}
        <button
          className="btn btn-dark mb-1 px-5 lg"
          color="dark"
          onClick={async () => {
            await AuthService.forgot(email);
          }}
        >
          Reset
        </button>
        <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
          <button
            className="btn btn-link"
            style={{ color: "#393f81" }}
            onClick={() => {
              setAuthState(Components.SignIn);
            }}
            >Sign In</button>
        </p>
        or
        <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
          <button
            className="btn btn-link"
            style={{ color: "#393f81" }}
            onClick={() => {
              setAuthState(Components.SignUp);
            }}
          >
            Register here
          </button>
        </p>
      </MDBCardBody>
    </MDBCol>
  );
};

export default ForgotPassword;
