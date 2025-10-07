import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);

    useEffect(() => {
        api.get("customer/myOrders")
            .then(res => {
                if (res.status !== 200) {
                    console.log("Something wrong");
                    return;
                }
                setMyOrders(res.data);
            })
            .catch(err => {
                console.error(err.message)
            })
    }, [])

    return (
        <div>
            <h1>My Order : {myOrders.length}</h1>
        </div>
    );
};

export default MyOrders;