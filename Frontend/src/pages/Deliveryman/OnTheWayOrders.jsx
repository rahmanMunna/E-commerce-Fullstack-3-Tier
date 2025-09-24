import React, { useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';
import { toast } from 'react-toastify';

const OnTheWayOrders = () => {

    const [onTheWayOrders, setOnTheWayOrders] = useState([]);

    const handleDeliveredBtn = (id) => {
        fetch(`https://localhost:44381/api/order/delivered/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success("Order has been delivered");
                }
                else {
                    alert("server issue")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetch("https://localhost:44381/api/order/getOnTheWayOrder")
            .then(res => res.json())
            .then(data => {
                setOnTheWayOrders(data);
            })
    }, [onTheWayOrders])



    return (
        <div className="container mx-auto">
            <h1>Assigned orders</h1>
            <table className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase font-semibold">
                    <tr>
                        <th className="px-6 py-3 text-left">Order ID</th>
                        <th className="px-6 py-3 text-left">Order Date</th>
                        <th className="px-6 py-3 text-left">Customer</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Shipping Address</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {
                        onTheWayOrders.map(onTheWayOrder =>
                            <OrdersTable key={onTheWayOrder.Id} order={onTheWayOrder} handleBtn={handleDeliveredBtn} ></OrdersTable>)
                    }
                </tbody>

            </table>

        </div>
    );
};

export default OnTheWayOrders;