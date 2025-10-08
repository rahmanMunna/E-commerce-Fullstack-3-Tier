import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";
import { Link } from "react-router-dom";

const CustomerTrackOrders = () => {

    const [trackOrders, setTrackOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("customer/trackOrders")
            .then(res => {
                if (res.status !== 200) {
                    console.log("Something wrong");
                    return;
                }
                setTrackOrders(res.data);
                setLoading(false)
                console.log(res.data);
            })
            .catch(err => {
                console.error(err.messages);
            })
    }, [])

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

    return (
        <div>
            {
                loading ?
                    <h1>Loading</h1>
                    :
                    <div>
                        <h1>Track Order : {trackOrders.length}</h1>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Deliveryman Id</th>
                                    <th>Total</th>
                                    <td>Actions</td>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trackOrders.map((trackOrder, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td># {trackOrder?.Id}</td>
                                                <td className="font-bold">{convertDateFormate(trackOrder?.Date)}</td>
                                                <td className="">{trackOrder?.OrderStatus?.Status}</td>
                                                <td>{trackOrder?.DeliveryManId !== 0 ? trackOrder?.DeliveryManId : "Not assigned yet"}</td>
                                                <td>Tk {trackOrder?.Total}</td>
                                                <td className="flex justify-center items-center gap-2">
                                                    <Link className="btn btn-info" to={`/customerDashboard/trackOrderDetails/${trackOrder.Id}`} relative="path">
                                                        Details
                                                    </Link>
                                                    <button className="btn btn-error">
                                                        Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default CustomerTrackOrders;