import { Link } from "react-router-dom";

const OrdersTable = ({ order, handleBtn }) => {
    const date = new Date(order.Date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <tr className="hover:bg-gray-50 transition duration-200">
            {/* Order ID */}
            <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                #{order.Id}
            </td>

            {/* Order Date */}
            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                {date}
            </td>

            {/* Customer Name */}
            <td className="px-6 py-4 text-base font-medium text-gray-800 whitespace-nowrap">
                {order.Customer.Name}
            </td>

            {/* Status Badge */}
            <td className="px-6 py-4">
                <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${order.OrderStatusID === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : order.OrderStatusID === 2
                                ? "bg-blue-100 text-blue-800"
                                : order.OrderStatusID === 3
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-200 text-gray-700"
                        }`}
                >
                    {order.OrderStatus.Status}
                </span>
            </td>

            {/* Shipping Info */}
            {order.OrderStatusID >= 3 && (
                <td className="px-6 py-4 text-sm text-gray-700">
                    {order.Customer.ShippingAddress.Location}, {order.Customer.ShippingAddress.City}
                </td>
            )}

            {/* Action Buttons */}
            <td className="px-6 py-4 text-right space-x-2">
                {order.OrderStatusID <= 2 && (
                    <>
                        <Link to={`/adminDashboard/viewPlaceOrderDetails/${order.Id}`}>
                            <button className="px-4 py-2 text-sm font-medium 
              text-white bg-gradient-to-r
               from-indigo-600 to-indigo-800 rounded-md shadow 
               hover:cursor-pointer
                hover:from-indigo-500 hover:to-indigo-700 transition duration-300">
                                View
                            </button>
                        </Link>
                        <button
                            onClick={() =>
                                document.getElementById(`cancel-btn-modal-${order.Id}`).showModal()
                            }
                            className="px-4 py-2 text-sm font-medium text-white 
              bg-gradient-to-r from-red-600 to-red-800 rounded-md shadow
              hover:cursor-pointer
             hover:from-red-500 hover:to-red-700 transition duration-300"
                        >
                            Cancel
                        </button>
                    </>
                )}

                {order.OrderStatusID === 3 && (
                    <button
                        onClick={() => handleBtn(order.Id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-800 rounded-md shadow hover:from-green-500 hover:to-green-700 transition duration-300"
                    >
                        Accept
                    </button>
                )}

                {order.OrderStatusID === 4 && (
                    <button
                        onClick={() => handleBtn(order.Id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-md shadow hover:from-gray-500 hover:to-gray-700 transition duration-300"
                    >
                        Delivered
                    </button>
                )}
            </td>
        </tr>
    );
};

export default OrdersTable;