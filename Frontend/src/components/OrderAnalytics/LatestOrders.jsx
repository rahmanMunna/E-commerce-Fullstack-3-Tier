import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";


const LatestOrders = () => {

    function formateDate(date) {
        const d = new Date(date).toLocaleString("en-US", {
            year: "numeric",    // 2025
            month: "short",     // Sep
            day: "numeric",     // 22
            hour: "2-digit",    // 05
            minute: "2-digit",  // 31
            hour12: true        // AM/PM format
        })
        return d;
    }

    const [latestOrders, setLatestOrders] = useState([]);
    const loadData = async () => {
        try {
            const count = 3
            const url = `orderAnalytics/latestOrders/${count}`;
            const res = await api.get(url);
            if (res.status === 200 && res.data !== null) {
                setLatestOrders(res.data);
                return;
            }
            console.log("Server Issue");

        } catch (err) {
            console.error(err.message)
        }
    }

    // console.log(latestOrders)
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Shipping Address</th>
                    </tr>
                </thead>
                <tbody>
                    {latestOrders.map((lo, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">#{lo.Id}</td>
                            <td className="px-4 py-2">{formateDate(lo.Date)}</td>
                            <td className="px-4 py-2">Tk {lo.Total}</td>
                            <td className="px-4 py-2">{lo.Customer.Name}</td>
                            <td className="px-4 py-2">
                                <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                                    {lo?.OrderStatus?.Status}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                {lo?.Customer?.ShippingAddress?.Location}, {lo?.Customer?.ShippingAddress?.City}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
};

export default LatestOrders;