import { useParams } from "react-router-dom";
import OrderItems from "../../components/OrderDetail/OrderItems";
import OrderCustomerInfo from "../../components/OrderDetail/OrderCustomerInfo";
import Shipping_PaymentInfo from "../../components/OrderDetail/Shipping_PaymentInfo";
import Steps from "../../components/Steps";
import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const CustomerOrderDetails = () => {

    const [orderDetail, setOrderDetail] = useState([]);
    const [statusId, setStatusId] = useState(0);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const id = params.Id;

    const loadData = (id) => {
        const url = `orderdetail/order/${id}`;
        api.get(url)
            .then(res => {
                if (res.status === 200) {
                    setOrderDetail(res.data);
                    setStatusId(res.data[0]?.Order?.OrderStatusID);
                    setLoading(false)
                    console.log(res.data);
                    return;
                }
                alert("Unauthorized Action")

            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        loadData(id);
    }, [statusId])
    return (
        <div>
            {
                loading ?
                    <h1>Loading</h1>
                    :
                    <div className="flex flex-col md:flex-row md:gap-8">
                        <Steps statusId={statusId}></Steps>
                        <div className="md:w-3/4 p-6 bg-white shadow-lg rounded-2xl">
                            <div >
                                {/* Order item  */}
                                <OrderItems orderDetail={orderDetail} id={id}></OrderItems>

                                {/* Order + Customer Info */}
                                <OrderCustomerInfo orderDetail={orderDetail}></OrderCustomerInfo>
                                {/* Shipping address */}
                                <Shipping_PaymentInfo orderDetail={orderDetail}></Shipping_PaymentInfo>
                            </div>
                        </div>
                    </div>
            }
        </div>

    );
};

export default CustomerOrderDetails;