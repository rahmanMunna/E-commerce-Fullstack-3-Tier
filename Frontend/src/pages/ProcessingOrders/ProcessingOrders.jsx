import { useEffect, useState } from "react";
import OrdersTable from "../../components/OrdersTable";
import api from "../../Interceptor/Api";
import CancelButtonModal from "../../components/Modal/CancelButtonModal";

const ProcessingOrders = () => {

    const [ordersProcessing, setOrdersProcessing] = useState([])
    // console.log(ordersProcessing)
    const loadData = () => {
        const url = "order/getProcessingOrder";
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    alert("Unauthorized action");
                    return
                }
                setOrdersProcessing(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                Placed Orders
            </h1>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
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
                        {ordersProcessing.length > 0 ? (
                            ordersProcessing.map((orderProcessing) => (
                                <OrdersTable key={`order-${orderProcessing.Id}`} order={orderProcessing} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                                    No orders in processing.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {ordersProcessing.map((orderProcessing) => (
                <CancelButtonModal
                    key={`modal-${orderProcessing.Id}`}
                    loadData={loadData}
                    oId={orderProcessing.Id}
                />
            ))}
        </div>
    );
};

export default ProcessingOrders;