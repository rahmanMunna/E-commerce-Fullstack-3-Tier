import { Outlet } from "react-router-dom";
import CustomerNavbar from "../../layouts/Customer/CustomerNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const CustomerDashboard = () => {

   
    return (
        <div>
            <CustomerNavbar></CustomerNavbar>
            <Outlet></Outlet>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>
    );
};

export default CustomerDashboard;