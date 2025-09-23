import { useEffect, useState } from "react";
import OrdersTable from "../../components/OrdersTable";

const ProcessingOrders = () => {

    const [ordersProcessing, setOrdersProcessing] = useState([])

    useEffect(() => {
        fetch("https://localhost:44381/api/order/getProcessingOrder")
            .then(res => res.json())
            .then(data => setOrdersProcessing(data))
    }, [])

    return (
        <div className="container mx-auto">
            <h1>Placed orders</h1>
            <table className="min-w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-3 text-left">Order ID</th>
                        <th className="px-6 py-3 text-left">Order Date</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {
                        ordersProcessing.map(orderProcessing => <OrdersTable order={orderProcessing} ></OrdersTable>)
                    }
                </tbody>

            </table>

        </div>
    );
};

export default ProcessingOrders;