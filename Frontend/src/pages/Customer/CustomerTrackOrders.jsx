import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const CustomerTrackOrders = () => {

    const [trackOrders, setTrackOrders] = useState([]);

    useEffect(() => {
        api.get("customer/trackOrders")
            .then(res => {
                if (res.status !== 200) {
                    console.log("Something wrong");
                    return;
                }
                setTrackOrders(res.data);
            })
            .catch(err => {
                console.error(err.messages);
            })
    }, [])

    return (
        <div>
            <h1>Track Order : {trackOrders.length}</h1>
        </div>
    );
};

export default CustomerTrackOrders;