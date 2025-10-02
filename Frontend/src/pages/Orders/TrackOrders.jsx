import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";


const TrackOrders = () => {

    const [trackOrders, setTrackOrder] = useState([]);

    const loadAllData = () => {
        const url = "order/trackOrders";
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    alert("Unauthorized action");
                    return
                }
                setTrackOrder(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(loadAllData, [])

    return (
        <div>
            {
                trackOrders.length > 0 &&
                <h1>{trackOrders.length}</h1>
            }
        </div>
    );
};

export default TrackOrders;