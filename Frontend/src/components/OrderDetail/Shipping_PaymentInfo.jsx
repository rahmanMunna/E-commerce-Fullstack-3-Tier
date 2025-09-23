import React from 'react';

const Shipping_PaymentInfo = ({orderDetail}) => {
    return (
        <div>
            {/* Shipping */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">
                    Shipping Address
                </h3>
                <p className="text-sm">
                    <span className="font-medium">City:</span>{" "}
                    {orderDetail?.[0]?.Order?.Customer?.ShippingAddress?.City}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Location:</span>{" "}
                    {orderDetail?.[0]?.Order?.Customer?.ShippingAddress?.Location}
                </p>
            </div>

            {/* Payment Summary */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">
                    Payment Summary
                </h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="py-1 text-gray-600">Subtotal</td>
                            <td className="py-1 text-right">
                                {orderDetail?.[0]?.Order?.Total
                                    ? orderDetail?.[0]?.Order?.Total - 60
                                    : 0}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1 text-gray-600">Shipping Charge</td>
                            <td className="py-1 text-right">60</td>
                        </tr>
                        <tr className="font-semibold">
                            <td className="py-2">Total</td>
                            <td className="py-2 text-right">{orderDetail?.[0]?.Order?.Total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-700 border-b pb-1 mb-2">
                    Payment Info
                </h3>
                <p className="text-sm">
                    <span className="font-medium">Method:</span>{" "}
                    {orderDetail?.[0]?.Order?.PaymentMethod ?? "Cash on Delivery"}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    {orderDetail?.[0]?.Order?.PaymentStatus ?? "N/A"}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Amount:</span>{" "}
                    {orderDetail?.[0]?.Order?.Total ?? "N/A"}
                </p>
            </div>
        </div>
    );
};

export default Shipping_PaymentInfo;