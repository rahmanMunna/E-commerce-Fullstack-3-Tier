import React from 'react';

const OrderItems = ({ orderDetail, id }) => {
    return (
        <div>
            {/* Header */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Order <span className="text-indigo-600">#{id}</span>
                </h1>
                <p className="text-gray-500 mt-1">Order Details</p>
            </div>
            {/* Items Table */}
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Items</h2>
            <table className="w-full text-sm border rounded-lg overflow-hidden mb-6">

                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2">Qty</th>
                        <th className="px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail?.map((od) => (
                        <tr key={od?.Id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{od?.Product?.Name}</td>
                            <td className="px-4 py-2 text-center">{od?.Qty}</td>
                            <td className="px-4 py-2 text-center font-medium">{od?.OrderPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderItems;