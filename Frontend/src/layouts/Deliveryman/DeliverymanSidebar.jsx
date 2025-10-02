import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const DeliverymanSidebar = () => {


    const { logout } = useContext(AuthContext);

    const linkCss = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition 
     ${isActive ? "bg-white/30 text-white font-semibold" : "bg-white/10 hover:bg-white/20"}`;
    return (
        <div className="w-64 min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 text-white flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/20">
                <h1 className="text-2xl font-bold">Delivery man Panel</h1>
                <p className="mt-1 text-sm text-gray-200">Welcome, Munna</p>
                <small className="text-gray-300">ID: #12345</small>
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



                <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition">
                    🔒 Logout
                </button>
            </div>
        </div>
    );
};

export default DeliverymanSidebar;