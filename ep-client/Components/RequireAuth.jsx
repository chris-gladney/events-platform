import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.role === allowedRole
    ? <Outlet />
    : auth?.user 
    ? <Navigate to="/" state={{from: location}} replace />  
    : <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
