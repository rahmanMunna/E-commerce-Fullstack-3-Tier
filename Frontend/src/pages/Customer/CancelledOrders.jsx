import React, { useEffect, useState } from 'react';
import api from '../../Interceptor/Api';

const CancelledOrders = () => {

    const [cancelledOrders, setCancelledOrders] = useState([]);

    useEffect(() => {
        api.get("customer/cancelledOrders")
            .then(res => {
                if (res.status !== 200) {
                    console.log("Something wrong");
                    return;
                }
                setCancelledOrders(res.data);
            })
            .catch(err => {
                console.error(err.messages);
            })
    }, [])
    return (
        <div>
            {cancelledOrders.length}
        </div>
    );
};

export default CancelledOrders;