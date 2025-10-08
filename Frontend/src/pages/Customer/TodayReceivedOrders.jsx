import React, { useEffect, useState } from 'react';
import api from '../../Interceptor/Api';

const TodayReceivedOrders = () => {

    const [receivedOrders, setReceivedOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        const url = "order/todayReceivedOrders";
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    console.error("Something  Wrong");
                    return
                }
                setReceivedOrders(res.data)
                setLoading(false)

            })
            .catch(err => {
                console.error(err.message)
            })
    }
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>

            {
                loading ?
                    (<h1>Loading</h1>)
                    :
                    (
                        receivedOrders.length === 0 ?
                            <h1>No Order received today</h1>
                            :
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Total</th>
                                        <th>DeliveryMan Id</th>
                                        <th>Status</th>
                                        <th>Order Date</th>
                                        <th>Delivered Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        receivedOrders.map((ro, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td># {ro?.Id}</td>
                                                    <td>{ro?.Total}</td>
                                                    <td>{ro?.DeliveryManId}</td>
                                                    <td>{ro?.OrderStatus?.Status}</td>
                                                    <td>{ro?.Date}</td>
                                                    <td>{ro?.DeliveredAt}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                    )

            }
        </div>
    );
};

export default TodayReceivedOrders;