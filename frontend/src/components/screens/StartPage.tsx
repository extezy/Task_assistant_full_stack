import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";


const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container align-items-center">
      <h1>Welcome to Task Assistant</h1>
      <div className="fw-normal mb-1">
      <Button
        className="btn"
        onClick={() => {
          navigate("/auth");
        }}
      >
        Sign In
      </Button>
      </div>
    </div>
  );
};

export default StartPage;
