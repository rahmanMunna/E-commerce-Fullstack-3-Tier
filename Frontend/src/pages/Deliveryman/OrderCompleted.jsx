import { useContext, useEffect, useState } from "react";
import api from "../../Interceptor/Api";
import AuthContext from "../../context/AuthContext";

const OrderCompleted = () => {
    const [orderCompleted, setOrderCompleted] = useState([]);
    const [todayOrderCompleted, setTodayOrderCompleted] = useState([]);
    const [loading, setLoading] = useState(true);
    // const { user } = useContext(AuthContext);

    const filterTodayOrderCompleted = (orders) => {
        const today = new Date().toISOString().split("T")[0];
             
        const todayCompleted = orders.filter((order) => {
            const orderDate = order?.Date?.split("T")[0];
            return orderDate === today;
        });
        
        setTodayOrderCompleted(todayCompleted);
    };

    const loadData = async () => {
        try {
            const url = "deliveryman/completedOrders";
            const res = await api.get(url);
            if (res.status === 200 && res.data) {
                setOrderCompleted(res.data);
                filterTodayOrderCompleted(res.data);
                setLoading(false)
            } else {
                throw new Error("Server Issue");
            }
        }
        catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Completed Orders
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl shadow p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-600">Total Completed</h2>
                        <p className="text-3xl font-bold text-green-700">
                            {orderCompleted.length}
                        </p>
                    </div>
                    <div className="text-green-500 text-4xl">✅</div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-600">
                            Today’s Completed
                        </h2>
                        <p className="text-3xl font-bold text-blue-700">
                            {todayOrderCompleted.length}
                        </p>
                    </div>
                    <div className="text-blue-500 text-4xl">📦</div>
                </div>
            </div>

            {/* Main Content */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <h1 className="text-gray-500 text-xl font-medium animate-pulse">
                        Loading...
                    </h1>
                </div>
            ) : orderCompleted.length === 0 ? (
                <div className="text-center py-10">
                    <h1 className="text-gray-600 text-lg font-semibold">No Orders Found</h1>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* Today's Orders */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Today’s Completed Orders
                        </h2>
                        {todayOrderCompleted.length === 0 ? (
                            <p className="text-gray-500 italic">No orders completed today.</p>
                        ) : (
                            <OrdersTable orders={todayOrderCompleted} />
                        )}
                    </div>

                    {/* All Orders */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            All Completed Orders
                        </h2>
                        <OrdersTable orders={orderCompleted} />
                    </div>
                </div>
            )}
        </div>
    );
};

const OrdersTable = ({ orders }) => (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
                <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Order Date</th>
                    <th className="px-6 py-3">Completed Date</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Shipping Address</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {orders.map((order, idx) => (
                    <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors duration-150"
                    >
                        <td className="px-6 py-3 font-semibold text-gray-800">
                            # {order?.Id}
                        </td>
                        <td className="px-6 py-3">{formateDate(order?.Date)}</td>
                        <td className="px-6 py-3">{formateDate(order?.DeliveredAt)}</td>
                        <td className="px-6 py-3 font-medium text-green-600">
                            Tk {order?.Total}
                        </td>
                        <td className="px-6 py-3">
                            {order?.Customer?.ShippingAddress?.Location},{" "}
                            {order?.Customer?.ShippingAddress?.City}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
const formateDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",    // 2025
        month: "short",     // Sep
        day: "numeric",     // 22
        hour: "2-digit",    // 05
        minute: "2-digit",  // 31
        hour12: true        // AM/PM format
    })
}


export default OrderCompleted;
