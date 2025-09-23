import React from 'react';

const OrderCustomerInfo = ({ orderDetail }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 border-b pb-1">Order Info</h3>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Created at:</span>{" "}
                    {orderDetail?.[0]?.Order?.Date &&
                        new Date(orderDetail?.[0]?.Order?.Date).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${orderDetail?.[0]?.Order?.OrderStatus?.Status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : orderDetail?.[0]?.Order?.OrderStatus?.Status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {orderDetail?.[0]?.Order?.OrderStatus?.Status}
                    </span>
                </p>
            </div>

            {/* Customer Info */}
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 border-b pb-1">
                    Customer Info
                </h3>
                <p className="text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {orderDetail?.[0]?.Order?.Customer?.Name}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {orderDetail?.[0]?.Order?.Customer?.Email}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    {orderDetail?.[0]?.Order?.Customer?.Phone}
                </p>
            </div>
        </div>
    );
};

export default OrderCustomerInfo;