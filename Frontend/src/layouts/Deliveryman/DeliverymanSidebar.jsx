import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const DeliverymanSidebar = () => {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleLogout = async () => {
            const response = await logout();
            console.log(response);
            if (response.data) {
                // toast.success("Logged out");
                localStorage.clear();
                navigate("/login")
    
            }
            else{
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
                <h1 className="text-2xl font-bold">Delivery man Panel</h1>
                <p className="mt-1 text-2xl text-gray-200">Welcome, <span className="text-3xl text-green-500">{user?.Name}</span></p>
                <p className="text-gray-300 text-xl">ID: <span className="text-2xl text-green-500">#{user?.Id}</span></p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col p-4 gap-3 flex-1">
                <NavLink
                    to="/deliverymanDashboard"
                    end
                    className={linkCss}
                >
                    🏠 Home
                </NavLink>

                <NavLink
                    to="onTheWay"
                    end
                    className={linkCss}
                >
                    On The Way
                </NavLink>

                <NavLink
                    to="/"
                    end
                    className={linkCss}
                >
                    Order Completed
                </NavLink>


                <button onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 px-4 py-2 
                rounded-lg bg-red-500 hover:bg-white hover:text-black hover:scale-105 transition">
                    🔒 Logout
                </button>
            </div>
        </div>
    );
};

export default DeliverymanSidebar;