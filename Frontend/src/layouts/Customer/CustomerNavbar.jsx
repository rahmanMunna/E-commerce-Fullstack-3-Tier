import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/CartContext"
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";


const CustomerNavbar = () => {
    const { cart } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);
    
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

    const linkClasses = ({ isActive }) =>
        `relative px-3 py-2 transition-all duration-300 font-medium ${isActive
            ? "text-black border-b-4"
            : "text-white hover:text-yellow-300 hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:rounded-full hover:after:bg-yellow-400 transition-all duration-300"
        }`;

    function calculatePriceAfterDiscount(price, discount) {
        return price - price * (discount / 100);
    }

    // toast.success(`Welcome ${user?.Name}`);


    useEffect(() => {
        const newTotal = cart.reduce((sum, element) => {
            const finalPrice = calculatePriceAfterDiscount(
                element.product.Price,
                element.product.Discount
            );
            return sum + finalPrice * element.qty;
        }, 0);
        setTotal(newTotal);
    }, [cart]);


    return (
        <div className="w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-3 text-white">

                {/* Brand */}
                <Link to="/" className="text-2xl font-bold tracking-wide hover:scale-105 transition">
                    E-Com
                </Link>

                {/* Center Nav */}
                <div className="hidden md:flex gap-8 font-medium">
                    <NavLink to="/customerDashboard" className={linkClasses}>Shop</NavLink>
                    <NavLink to="trackOrders" className={linkClasses}>Track Orders</NavLink>
                    <NavLink to="cancelled" className={linkClasses}>Cancelled</NavLink>
                    <NavLink to="myOrders" className={linkClasses}>My Orders</NavLink>
                    <NavLink to="todaysReceivedOrders" className={linkClasses}>Today's Received Orders</NavLink>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                    {/* Cart */}
                    <div className="relative group">
                        <Link to="cart" className="flex items-center gap-2 hover:text-yellow-300 transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4m-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="hidden sm:block">Cart</span>
                        </Link>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5">
                                {cart.length}
                            </span>
                        )}

                        {/* Dropdown Preview */}
                        <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-gray-800 rounded-lg shadow-lg w-64 p-4">
                            <h3 className="font-semibold">{cart.length} Items</h3>
                            <p className="text-sm text-red-500">Subtotal: TK {total}</p>
                            <Link
                                to="cart"
                                className="block mt-3 w-full bg-indigo-600 text-white text-center rounded-lg py-2 hover:bg-indigo-700 transition"
                            >
                                View Cart
                            </Link>
                        </div>
                    </div>

                    {/* Profile & logout */}
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 hover:text-yellow-300  transition">
                            <Link to="customerProfile" className="btn  rounded-full bg-yellow-300
                             text-black flex items-center justify-center font-bold
                             hover:scale-105 transition 2s">
                                {user?.Name[0]}
                            </Link>
                            <span className="hidden sm:block">{user?.Name}</span>
                        </div>
                        <button onClick={handleLogout} className="btn border-2 border-red-800 text-red-700 hover:scale-105 hover:btn-error hover:text-white transition 2s">
                            Logout
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerNavbar;