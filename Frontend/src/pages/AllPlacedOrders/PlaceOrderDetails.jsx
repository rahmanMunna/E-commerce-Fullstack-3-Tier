import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Steps from '../../components/Steps';
import OrderCustomerInfo from '../../components/OrderDetail/OrderCustomerInfo';
import Shipping_PaymentInfo from '../../components/OrderDetail/Shipping_PaymentInfo';
import OrderItems from '../../components/OrderDetail/OrderItems';



const PlaceOrderDetails = () => {

    const [orderDetail, setOrderDetail] = useState([]);
    const navigate = useNavigate();

    const params = useParams();
    const id = params.Id;


    const handleConfirm = (pId) => {
        // alert(pId)
        // let classes = document.getElementById("confirmOrderStep").classList;
        // classes.add("step-primary");
        fetch(`https://localhost:44381/api/order/processing/${pId}`, {
            method: "put",
            "content-type": "application/json"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success("✅ Order Confirmed and goes for Processing");
                    // navigate("/");

                }
            })
    }

    const handleAssignBtn = e => {
        e.preventDefault();
        const selectedOptionValue = e.target.deliveryman.value;
        if (!selectedOptionValue) {
            alert("Please select an deliveryman");

            return;
        }
        const AssignDeliveryman = {
            OrderId: id,
            DeliverymanId: selectedOptionValue

        }

        fetch("https://localhost:44381/api/order/assign", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(AssignDeliveryman)
        })

            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success("Assigned to a Delivery man");
                    
                }
                else {
                    toast.error("Couldn't Assigned to a Delivery man");
                }
            })

        
    }

    useEffect(() => {
        fetch(`https://localhost:44381/api/orderdetail/order/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrderDetail(data);

            })
    }, [orderDetail])

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row md:gap-8">
                    {/* Steps */}
                    <Steps statusId={orderDetail[0]?.Order?.OrderStatusID}></Steps>

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
                                orderDetail[0]?.Order?.OrderStatusID === 1 &&
                                <button onClick={() => handleConfirm(id)} className="flex-1 btn btn-error">
                                    Confirm
                                </button>
                            }
                        </div>
                    </div>
                    {
                        orderDetail[0]?.Order?.OrderStatusID <=2 &&
                        <form onSubmit={handleAssignBtn} action="" className='flex items-center justify-center gap-2 h-10 '>
                        <select className='border p-2' name="deliveryman" id="">
                            <option selected disabled value="">Select an delivery man</option>Select an delivery man
                            <option value="1">Rahim</option>
                        </select>
                        <input type="submit" value={"Assign"} className='btn btn-primary' />

                    </form>
                    }
                </div>
            </div>
        </div>



    );
};

export default PlaceOrderDetails;