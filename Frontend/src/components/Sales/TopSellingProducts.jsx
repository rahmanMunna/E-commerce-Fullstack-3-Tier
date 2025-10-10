import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const TopSellingProducts = () => {

    const [topSellingProducts, setTopSellingProducts] = useState([]);

    const loadData = async () => {
        try {
            const count = 3;
            const days = 3;
            const url = `orderAnalytics/topSellingProducts/count/${count}/days/${days}`;
            const res = await api.get(url);
            if (res.status === 200 && res.data !== null) {
                setTopSellingProducts(res.data)
                return;
            }
            console.log("Server Issue")
        }
        catch (err) {
            console.error(err.messages)
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    // console.log(topSellingProducts)
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Total Sold</th>
                        <th className="px-4 py-2 text-left">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {topSellingProducts.map((product, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">#{product.Id}</td>
                            <td className="px-4 py-2">{product.Name}</td>
                            <td className="px-4 py-2">{product.TotalSold} units</td>
                            <td className="px-4 py-2">Tk {product.TotalRevenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopSellingProducts;