import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const LowStock = () => {

    const [lowStock, setLowStock] = useState([]);

    const loadData = async () => {
        try {
            const url = "orderAnalytics/lowStockProducts";
            const res = await api.get(url);
            if (res.status === 200 && res.data !== null) {
                setLowStock(res.data);
                return;
            }
            console.log("Server Issue");

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    // console.log(lowStock)

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">In Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {lowStock.map((product, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{product.Id}</td>
                            <td className="px-4 py-2">{product.Name}</td>
                            <td className="px-4 py-2 text-red-600 font-semibold">{product.StockQty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LowStock;