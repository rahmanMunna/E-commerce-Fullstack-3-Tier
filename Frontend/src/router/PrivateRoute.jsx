import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    //if token not exist--- not logged in
    if (!token) {
        return <Navigate to="/login" replace></Navigate>
    }

    // If role doesn’t match, redirect to "Unauthorized"
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace></Navigate>
    }

    return <Outlet />
};

export default PrivateRoute;