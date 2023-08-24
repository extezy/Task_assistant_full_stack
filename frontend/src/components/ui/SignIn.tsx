import { useState, useContext } from "react";
import { AuthService } from "../../services/auth.service";
import { MDBCardBody, MDBCol, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { AuthComponentContext } from "../providers/AuthComponentProvider";
import { Components } from "../providers/AuthComponentProvider";
import { useNavigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authState, setAuthState } = useContext(AuthComponentContext);
  const navigate = useNavigate();

  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/task"

  return (
    <MDBCol md="6">
      <MDBCardBody className="d-flex flex-column">
        <div className="d-flex flex-row mt-2">
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
          <span className="h1 fw-bold">Task Assistant</span>
        </div>

        <h6 className="fw-normal my-1 pb-4" style={{ letterSpacing: "1px" }}>
          Sign into your account
        </h6>

        <MDBInput
          wrapperClass="mb-1"
          label="Email address"
          id="formControlEmail"
          type="email"
          size="lg"
          onChange={(e) => setUserName(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-1"
          label="Password"
          id="formControlPassword"
          type="password"
          size="lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-dark mb-1 px-5 lg"
          color="dark"
          onClick={async () => {
            const response = await AuthService.signin(username, password);
            if (response.access_token){
              navigate(fromPage);
            }
          }}
        >
          Login
        </button>
        <p className="mb-1 pb-lg-2">
        <button
            className="btn btn-link"
            style={{ color: "#393f81" }}
            onClick={() => {
              setAuthState(Components.Forgot);
            }}
          >Forgot password?</button>
        </p>
        <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
          Don't have an account?{" "}
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

        {/* <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div> */}
      </MDBCardBody>
    </MDBCol>
  );
};

export default SignIn;
