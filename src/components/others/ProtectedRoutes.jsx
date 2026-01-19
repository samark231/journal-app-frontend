// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import Loading from "./Loading";

const ProtectedRoutes = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  // 1. Loading Check (CRITICAL!)
  // If we are still asking the backend "Is this user logged in?", 
  // show a spinner. Do NOT kick them out yet!
  if (isCheckingAuth) {
    return <Loading/>;
  }

  // 2. Authentication Check
  // If loading is done and there is still no user, kick them out.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Access Granted
  // If they are logged in, render the protected page (the children).
  return children;
};

export default ProtectedRoutes;