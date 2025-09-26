import { Link } from "react-router-dom";

const OrdersTable = ({ order, handleBtn }) => {

    const date = new Date(order.Date).toLocaleString("en-US", {
        year: "numeric",    // 2025
        month: "short",     // Sep
        day: "numeric",     // 22
        hour: "2-digit",    // 05
        minute: "2-digit",  // 31
        hour12: true        // AM/PM format
    })



    return (
        <tr className="items-center hover:bg-gradient-to-r from-gray-50 via-white to-gray-50 transition">
            {/* Order ID */}
            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                {order.Id}
            </td>

            {/* Order Date */}
            <td className="px-6 py-4 text-sm text-gray-600">
                {date}
            </td>

            {/* Customer */}
            <td className="px-6 py-4 text-xl font-medium text-gray-800">
                {order.Customer.Name}
            </td>

            {/* Status with colored badge */}
            <td className="px-6 py-4 btn btn-error">
                <span>{order.OrderStatus.Status}</span>
            </td>
            {
                order.OrderStatusID >= 3 &&
                <td>
                    {order.Customer.ShippingAddress.Location}, {order.Customer.ShippingAddress.City}
                </td>
            }

            {/* Actions */}
            {/* View Btn */}
            {
                order.OrderStatusID <= 2 &&
                <td className="px-6 py-4 text-right ">
                    <Link to={`/adminDashboard/viewPlaceOrderDetails/${order.Id}`}>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white 
                       bg-gradient-to-r from-indigo-600 to-indigo-800 
                       hover:from-blue-200 hover:to-yellow-600  hover:cursor-grab 
                       hover:shadow-lg transition">
                            View
                        </button>
                    </Link>
                    <Link >
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white 
                       bg-gradient-to-r from-red-600 to-red-800
                       hover:from-blue-300 hover:to-red-900  hover:cursor-grab 
                       hover:shadow-lg transition">
                            Cancel
                        </button>
                    </Link>
                </td>
            }
            {/* Accept btn */}
            {
                order.OrderStatusID === 3 &&
                <td className="px-6 py-4 text-right">
                    <button
                        onClick={() => handleBtn(order.Id)}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white 
                       bg-gradient-to-r from-indigo-600 to-indigo-800 
                       hover:from-blue-200 hover:to-yellow-600  hover:cursor-grab 
                       hover:shadow-lg transition">
                        Accept
                    </button>

                </td>
            }
            {/* Delivered btn */}
            {
                order.OrderStatusID === 4 &&
                <td className="px-6 py-4 text-right">
                    <button
                        onClick={() => handleBtn(order.Id)}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white 
                       bg-gradient-to-r from-indigo-600 to-indigo-800 
                       hover:from-blue-200 hover:to-yellow-600  hover:cursor-grab 
                       hover:shadow-lg transition">
                        Delivered
                    </button>

                </td>
            }
        </tr>


    );
};

export default OrdersTable; 
