import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../layouts/Admin/AdminNavbar';
import AdminSidebar from '../../layouts/Admin/AdminSidebar';
import AllPlacedOrders from '../../pages/AllPlacedOrders/AllPlacedOrders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar (full width top) */}
            <div className="w-full">
                <AdminNavbar />
            </div>

            {/* Content below navbar */}
            <div className="flex flex-1">
                {/* Sidebar (left) */}
                <div className="w-1/6">
                    <AdminSidebar />
                </div>

                {/* Main content area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* <AllPlacedOrders></AllPlacedOrders> */}
                    <Outlet></Outlet>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default AdminDashboard;