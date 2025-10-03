import React, { useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';
import { toast } from 'react-toastify';
import api from '../../Interceptor/Api';

const OnTheWayOrders = () => {

    const [onTheWayOrders, setOnTheWayOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDeliveredBtn = async (id) => {
        const response = await api.put(`order/delivered/${id}`);
        if (response.data) {
            setLoading(true)
            toast.success("Order : " + id + " has  been delivered");
        }

    }

    useEffect(() => {
        api.get("order/getOnTheWayOrder")
            .then(response => {
                setOnTheWayOrders(response.data)
                setLoading(false)
                console.log(response)
            })
            .catch(err => {
                console.error(err.message)
            })

    }, [loading])



    return (
        <div className="container mx-auto">
            {
                loading ?
                    <h1>Loading</h1>
                    :
                    <div>
                        <h1>On the Way orders : {onTheWayOrders.length}</h1>
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

            }


        </div>
    );
};

export default OnTheWayOrders;