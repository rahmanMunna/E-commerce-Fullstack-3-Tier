import React, { useEffect, useState } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Steps from '../../components/Steps';
import OrderCustomerInfo from '../../components/OrderDetail/OrderCustomerInfo';
import Shipping_PaymentInfo from '../../components/OrderDetail/Shipping_PaymentInfo';
import OrderItems from '../../components/OrderDetail/OrderItems';
import api from '../../Interceptor/Api';



const PlaceOrderDetails = () => {

    const [orderDetail, setOrderDetail] = useState([]);
    const [deliverymen, setDeliverymen] = useState([]);
    const [statusId, setStatusId] = useState(0);
    const [loading, setLoading] = useState(true);
    // console.log(statusId)

    const params = useParams();
    const id = params.Id;


    const handleConfirm = (pId) => {

        api.put(`order/processing/${pId}`)
            .then(res => {
                if (res.data) {
                    setStatusId(2)
                    toast.success("Order has been confirmed")
                    return;
                }
                toast.success("Order couldn't confirmed")
            })
            .catch(err => {
                console.error(err)
            })
    }

    const handleAssignBtn = e => {
        e.preventDefault();
        const selectedOptionValue = e.target.deliveryman.value;
        if (!selectedOptionValue) {
            alert("Please select an deliveryman");
            return;
        }
        const assignDeliveryman = {
            OrderId: id,
            DeliverymanId: selectedOptionValue

        }
        sendToServer(assignDeliveryman)

    }
    async function sendToServer(assignDeliveryman) {
        try {
            const response = await api.put("order/assign", assignDeliveryman)
            console.log(response);
            if (response.data) {
                setStatusId(3)
                toast.success("Assigned to a Delivery man");
                return;
            }
            toast.success("Assigned Delivery man Failed");
        }
        catch (err) {
            console.error(err);
        }
    }

    async function loadAllDeliveryman() {
        const response = await api("deliveryman/all");
        if (response.status === 200 && response.data.length > 0) {
            setDeliverymen(response.data)
        }
    }

    useEffect(() => {
        const url = `orderdetail/order/${id}`;
        api.get(url)
            .then(res => {
                if (res.status === 200) {
                    setOrderDetail(res.data);
                    setStatusId(res.data[0]?.Order?.OrderStatusID);
                    setLoading(false)
                    return;
                }
                alert("Unauthorized Action")

            })
            .catch(err => {
                console.error(err)
            })
        loadAllDeliveryman();
    }, [statusId])


    return (
        <div>
            {
                loading ?
                    <h1>Loading</h1>
                    :
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col md:flex-row md:gap-8">
                            {/* Steps */}
                            <Steps statusId={statusId}></Steps>

                            {/* Order Details */}
                            <div className="md:w-3/4 p-6 bg-white shadow-lg rounded-2xl">
                                {/* Order item  */}
                                <OrderItems orderDetail={orderDetail} id={id}></OrderItems>

                                {/* Order + Customer Info */}
                                <OrderCustomerInfo orderDetail={orderDetail}></OrderCustomerInfo>
                                {/* Shipping address */}
                                <Shipping_PaymentInfo orderDetail={orderDetail}></Shipping_PaymentInfo>

                                {/* Buttons */}
                                <div className="flex flex-col md:flex-row gap-4 mt-4">
                                    <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                                        Print Receipt
                                    </button>
                                    {
                                        statusId === 1 &&
                                        <button onClick={() => handleConfirm(id)} className="flex-1 btn btn-error">
                                            Confirm
                                        </button>
                                    }
                                </div>
                            </div>
                            {
                                statusId <= 2 &&
                                <form onSubmit={handleAssignBtn} action="" className='flex items-center justify-center gap-2 h-10 '>
                                    <select className='border p-2' name="deliveryman" id="">
                                        <option selected disabled value="">Select an delivery man</option>Select an delivery man
                                        {
                                            deliverymen.length > 0 &&
                                            deliverymen.map(deliveryman => {
                                                return <option value={deliveryman.Id}>{deliveryman.Name}</option>
                                            })
                                        }
                                    </select>
                                    <input type="submit" value={"Assign"} className='btn btn-primary' />

                                </form>
                            }
                        </div>
                    </div>
            }

        </div>



    );
};

export default PlaceOrderDetails;