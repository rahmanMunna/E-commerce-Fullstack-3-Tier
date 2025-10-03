import React, { useContext, useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';
import { toast } from 'react-toastify';
import api from '../../Interceptor/Api';
import AuthContext from '../../context/AuthContext';


const AssignedOrders = () => {

    const [assignedOrders, setAssignedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user == null)
            return;

        const url = `order/getAssignedOrder/${user?.Id}`;
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    alert("Unauthorize Action");
                    return;
                }
                setAssignedOrders(res.data);
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })

    }, [user])

    const handleAcceptBtn = async (id) => {

        try {
            const response = await api.put(`order/ontheway/${id}`)
            if (response.data) {
                const newAssignedOrders = assignedOrders.filter(order => order.Id !== id)
                setAssignedOrders(newAssignedOrders);
                toast.success("Accept  OrderId : " + id);
                return;
            }
            toast.success("Order Cant Accept");
        }
        catch (err) {
            console.log(err.message)
        }


    }

    return (
        <div className="container mx-auto">
            {
                loading ?
                    <h1>Loading</h1>
                    :
                    <div>
                        <h1>Assigned orders  : {assignedOrders.length}</h1>
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
            }

        </div>
    );
};

export default AssignedOrders;