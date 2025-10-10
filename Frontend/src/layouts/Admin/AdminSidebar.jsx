import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const AdminSidebar = () => {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await logout();
        console.log(response);
        if (response.data) {
            // toast.success("Logged out");
            localStorage.clear();
            navigate("/login")
        }
        else {
            toast.success("something went wrong");
        }
    }

    const linkCss = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition 
     ${isActive ? "bg-white/30 text-white font-semibold" : "bg-white/10 hover:bg-white/20"}`;

    return (
        <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 text-white flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/20">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="mt-1 text-sm text-gray-200">Welcome, Munna</p>
                <small className="text-gray-300">ID: #12345</small>
            </div>

            {/* Navigation */}
            <div className="flex flex-col p-4 gap-3 flex-1">
                <NavLink
                    to="/adminDashboard"
                    end
                    className={linkCss}
                >
                    🏠 Home
                </NavLink>

                <NavLink to="/adminDashboard/manageProducts" className={linkCss}>
                    📦 Manage Products
                </NavLink>

                <NavLink to="/adminDashboard/placedOrders" className={linkCss}>
                    🛒 Placed Orders
                </NavLink>

                <NavLink to="/adminDashboard/processingOrders" className={linkCss}>
                    ⚙️ Processing
                </NavLink>

                <NavLink to="/adminDashboard/deliveredOrders" className={linkCss}>
                    ✅ Delivered
                </NavLink>

                <NavLink to="/adminDashboard/trackOrders" className={linkCss}>
                    🚚 Track  Orders
                </NavLink>

                <NavLink to="/adminDashboard/allOrders" className={linkCss}>
                    📋 All Orders
                </NavLink>

                <NavLink to="/adminDashboard/financial" className={linkCss}>
                    💰 Financial
                </NavLink>
                <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                 bg-red-500 hover:bg-white hover:text-black hover:cursor-pointer hover:scale-105 transition">
                    🔒 Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
