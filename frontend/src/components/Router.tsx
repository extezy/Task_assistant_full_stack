import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./screens/auth/Auth";
import AuthComponentProvider from "./providers/AuthComponentProvider";
import StartPage from "./screens/StartPage";
import Tasks from "./screens/task/Tasks";
import ProtectedRoute from "./screens/auth/ProtectedRoute";
import Task from "./screens/task/Task";


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
        <Route
          path="/task"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
