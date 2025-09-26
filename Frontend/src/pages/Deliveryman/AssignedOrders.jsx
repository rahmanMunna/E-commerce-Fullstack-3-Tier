import React, { useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';
import { toast } from 'react-toastify';


const AssignedOrders = () => {

    const [assignedOrders, setAssignedOrders] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44381/api/order/getAssignedOrder")
            .then(res => res.json())
            .then(data => {
                setAssignedOrders(data);
            })
    }, [assignedOrders])

    const handleAcceptBtn = (id) => {
        fetch(`https://localhost:44381/api/order/ontheway/${id}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newAssignedOrders = assignedOrders.filter(order => order.Id !== id)
                    setAssignedOrders(newAssignedOrders);
                    toast.success("Accept the Order, OrderId : "+id);
                }
                else {
                    console.log("server issue")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                        assignedOrders.map(assignedOrder =>
                            <OrdersTable key={assignedOrder.Id} order={assignedOrder} handleBtn={handleAcceptBtn} ></OrdersTable>)
                    }
                </tbody>

            </table>

        </div>
    );
};

export default AssignedOrders;