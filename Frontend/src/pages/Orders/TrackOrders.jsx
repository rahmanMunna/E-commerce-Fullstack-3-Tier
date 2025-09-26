import { useEffect, useState } from "react";


const TrackOrders = () => {

    const [trackOrders, setTrackOrder] = useState([]);

    const loadAllData = () => {
        fetch("https://localhost:44381/api/order/trackOrders")
            .then(res => res.json())
            .then(data => setTrackOrder(data))
    }

    useEffect(loadAllData, [])

    return (
        <div>
            {
                trackOrders.length
            }
        </div>
    );
};

export default TrackOrders;