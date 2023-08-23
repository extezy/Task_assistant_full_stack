import { useEffect, useContext } from "react";
import { useSearchParams } from 'react-router-dom'

import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import SignIn from "../../ui/SignIn";
import SignUp from "../../ui/SignUp";
import ForgotPassword from "../../ui/ForgotPassword";
import ResetPassword from "../../ui/ResetPassword";
import { AuthComponentContext } from "../../providers/AuthComponentProvider";
import { Components } from "../../providers/AuthComponentProvider";

const getComponent = (state: string): JSX.Element | null => {
  switch (state) {
    case Components.SignIn:
      return <SignIn />
    case Components.SignUp:
      return <SignUp />
    case Components.Forgot:
      return <ForgotPassword />
    case Components.Reset:
      return <ResetPassword />
    default:
      return null
  }
}


const Auth = () => {
  const { authState, setAuthState} = useContext(AuthComponentContext);
  const [searchParams, setSearchParams] = useSearchParams()

  const token = searchParams.get('token')
  if (token) {
    setAuthState(Components.Reset)
  }

  useEffect(() => {
    getComponent(authState)
  }, [setAuthState]);

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="logo.webp"
              alt="login form"
              className="rounded-start w-100 h-100"
            />
          </MDBCol>

          {getComponent(authState)}

        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Auth;