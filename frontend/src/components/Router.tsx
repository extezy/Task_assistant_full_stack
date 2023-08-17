import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./screens/auth/Auth";
import AuthComponentProvider from "./providers/AuthComponentProvider";
import StartPage from "./screens/StartPage";
import Tasks from "./screens/task/Tasks";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/auth"
          element={
            <AuthComponentProvider>
              <Auth />
            </AuthComponentProvider>
          }
        />
        <Route path="/task" element={<Tasks />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
