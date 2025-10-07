import { useEffect, useState } from "react";
import OrdersTable from "../../components/OrdersTable";
import api from "../../Interceptor/Api";
import CancelButtonModal from "../../components/Modal/CancelButtonModal";

const AllPlacedOrders = () => {

    const [placedOrders, setPlacedOrders] = useState([]);

    useEffect(() => {
        const route = "order/getPlacedOrder";
        api.get(route)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res.status)
                    return;
                }
                setPlacedOrders(res.data);
            })
            .catch(err => {
                if (err.status === 403) {
                    console.log("You don't have any access to this api")
                }
                else if (err.status === 401) {
                    console.log("PLease provide an Token")
                }
            })
    }, []);

    const handleCancel = (oId) => {
        alert(oId)
    }
    console.log(placedOrders)


    return (
        <div className="">
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
                        placedOrders.length > 0 &&
                        placedOrders.map((placedOrder, idx) => {
                            return (
                                <>
                                    <CancelButtonModal handleCancel={handleCancel} oId={placedOrder.Id}></CancelButtonModal>
                                    <OrdersTable key={idx} order={placedOrder} ></OrdersTable>
                                </>
                            )
                        })
                    }
                </tbody>

            </table>

        </div>
    );
};

export default AllPlacedOrders;