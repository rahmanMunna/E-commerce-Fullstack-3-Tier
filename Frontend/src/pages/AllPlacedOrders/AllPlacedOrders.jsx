import { useEffect, useState } from "react";
import OrdersTable from "../../components/OrdersTable";
import api from "../../Interceptor/Api";
import CancelButtonModal from "../../components/Modal/CancelButtonModal";

const AllPlacedOrders = () => {
    const [placedOrders, setPlacedOrders] = useState([]);

    const loadData = () => {
        api
            .get("order/getPlacedOrder")
            .then((res) => {
                if (res.status === 200) {
                    setPlacedOrders(res.data);
                } else {
                    console.warn("Unexpected status:", res.status);
                }
            })
            .catch((err) => {
                if (err.status === 403) {
                    console.error("Access denied to this API");
                } else if (err.status === 401) {
                    console.error("Token missing or invalid");
                } else {
                    console.error("Error fetching orders:", err);
                }
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 py-4 bg-gradient-to-r from-violet-100 via-amber-100 to-violet-100 border-y-2 border-amber-800 shadow-sm">
                Placed Orders
            </h1>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-3 text-left">Order ID</th>
                            <th className="px-6 py-3 text-left">Order Date</th>
                            <th className="px-6 py-3 text-left">Customer</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {placedOrders.length > 0 ? (
                            placedOrders.map((placedOrder, idx) => (
                                <OrdersTable key={idx} order={placedOrder} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                                    No placed orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Cancel Modals */}
            {placedOrders.map((placedOrder) => (
                <CancelButtonModal
                    key={`modal-${placedOrder.Id}`}
                    loadData={loadData}
                    oId={placedOrder.Id}
                />
            ))}
        </div>
    );
};

export default AllPlacedOrders;