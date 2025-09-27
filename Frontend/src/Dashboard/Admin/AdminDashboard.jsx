import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../layouts/Admin/AdminNavbar';
import AdminSidebar from '../../layouts/Admin/AdminSidebar';
import AllPlacedOrders from '../../pages/AllPlacedOrders/AllPlacedOrders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar (fixed at top) */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <AdminNavbar />
            </div>

            {/* Page layout with sidebar + content */}
            <div className="flex pt-16"> {/* pt-16 = height of navbar */}

                {/* Sidebar (fixed left) */}
                <div className="w-1/6 fixed top-16 left-0 bottom-0 bg-white shadow-md z-40">
                    <AdminSidebar />
                </div>

                {/* Main content (scrollable) */}
                <div className="p-6  overflow-y-auto container mx-auto">
                    <Outlet />
                </div>
            </div>

            {/* Toast */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AdminDashboard;