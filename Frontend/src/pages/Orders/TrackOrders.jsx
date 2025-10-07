import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";
import { Link } from "react-router-dom";


const TrackOrders = () => {

    const [trackOrders, setTrackOrder] = useState([]);
    const [countDeliveredOrders, setCountDeliveredOrders] = useState(0)
    const [countOnTheWayOrders, setCountOnTheWayOrders] = useState(0)
    const [countAssignedOrders, setCountAssignedOrders] = useState(0)

    function convertDateFormate(date) {
        return new Date().toLocaleString("en-US", {
            year: "numeric",    // 2025
            month: "short",     // Sep
            day: "numeric",     // 22
            hour: "2-digit",    // 05
            minute: "2-digit",  // 31
            hour12: true        // AM/PM format
        })
    }



    function count(orders, statusId) {
        const selectedOrder = orders.filter(order => order.OrderStatusID === statusId)
        console.log(selectedOrder.length)
        return selectedOrder.length;
    }

    const loadAllData = () => {
        const url = "order/trackOrders";
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    alert("Unauthorized action");
                    return
                }
                setTrackOrder(res.data)
                let c = count(res.data, 3)
                setCountAssignedOrders(c)
                c = count(res.data, 4)
                setCountOnTheWayOrders(c)
                c = count(res.data, 5)
                setCountDeliveredOrders(c)
            })
            .catch(err => {
                console.error(err)
            })
    }
    console.log(trackOrders)

    useEffect(loadAllData, [])

    return (
        <div>
            {
                trackOrders.length > 0 &&
                <div >
                    <div className="flex gap-3">
                        <h1>Total Track Orders : {trackOrders.length}</h1>|
                        <h1>Assigned Orders : {countAssignedOrders}</h1>|
                        <h1>On The way Orders : {countOnTheWayOrders}</h1>|
                        <h1>Delivered Orders : {countDeliveredOrders}</h1>|
                    </div>
                    <div>
                        <table className="table  text-center">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer Name</th>                                  
                                    <th>Order Date</th>
                                    <th>Total</th>
                                    <th>Shipping Address</th>
                                    <th>Assigned Deliveryman</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trackOrders.map(to => {
                                        return (
                                            <tr>
                                                <td>#{to?.Id}</td>
                                                <td>{to?.Customer?.Name}</td>                                            
                                                <td>{convertDateFormate(to?.Date)}</td>
                                                <td>{to?.Total} TK</td>
                                                <td>{to?.Customer?.ShippingAddress.City}, {to?.Customer?.ShippingAddress?.Location}</td>
                                                <td>{to?.DeliveryManId}</td>
                                                <td>{to?.OrderStatus?.Status}</td>
                                                <td className="flex gap-2">
                                                    <Link to={`/adminDashboard/viewPlaceOrderDetails/${to.Id}`} relative="path" className="btn btn-primary">
                                                        View
                                                    </Link>
                                                    <Link className="btn btn-error">
                                                        Cancel
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default TrackOrders;