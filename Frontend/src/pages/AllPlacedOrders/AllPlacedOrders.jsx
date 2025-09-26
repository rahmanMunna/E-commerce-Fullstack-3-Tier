import { useEffect, useState } from "react";
import OrdersTable from "../../components/OrdersTable";

const AllPlacedOrders = () => {

    const [placedOrders, setPlacedOrders] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44381/api/order/getPlacedOrder")
            .then(res => res.json())
            .then(data => setPlacedOrders(data))
    }, [])

    return (
        <div className="w-11/12">
            <h1 className="text-4xl mb-4 border-y-2 border-amber-800  p-2 text-center bg-violet-50">Placed orders</h1>
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
                        placedOrders.map(placedOrder => <OrdersTable order={placedOrder} ></OrdersTable>)
                    }
                </tbody>

            </table>

        </div>
    );
};

export default AllPlacedOrders;