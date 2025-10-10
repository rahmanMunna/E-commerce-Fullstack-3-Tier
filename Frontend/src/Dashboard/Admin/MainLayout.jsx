import SaleWeeklyBarChart from "../../components/Sales/SaleWeeklyBarChart";
import TopSellingProducts from "../../components/Sales/TopSellingProducts";
import LowStock from "../../components/Stock/LowStock";
import LatestOrders from "../../components/OrderAnalytics/LatestOrders";
import { useContext, useEffect, useState } from "react";
import AnalyticsContext from "../../context/AnalyticsContext";

const MainLayout = () => {
    const { loadData } = useContext(AnalyticsContext);
    const [todayTotalOrderCompleted, setTodayTotalOrderCompleted] = useState(0);
    const [todayTotalSale, setTodayTotalSale] = useState(0);
    const [todayTotalRefund, setTodayTotalRefund] = useState(0);
    useEffect(() => {
        loadData("orderAnalytics/todayTotalOrderCompleted", setTodayTotalOrderCompleted);
        loadData("financial/todayTotalSale", setTodayTotalSale);
        loadData("financial/todayTotalRefund", setTodayTotalRefund);
    }, [])

    // const { todayTotalOrderCompleted, todayTotalSale, todayTotalRefund } = useContext(AnalyticsContext)
    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weekly Sales */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-center border-b pb-2 mb-4">📊 Weekly Sales</h2>
                    <SaleWeeklyBarChart />
                </div>

                {/* Top Selling Products */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-green-600 text-center border-b pb-2 mb-4">🔥 Top Selling Products</h2>
                    <TopSellingProducts />
                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Latest Orders */}
                <div className="bg-white rounded-lg shadow-md p-4 col-span-2">
                    <h2 className="text-xl font-semibold text-center border-b pb-2 mb-4">📦 Latest Orders Summary</h2>
                    <LatestOrders />
                </div>

                {/* Low Stock */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold text-red-600 text-center border-b pb-2 mb-4">⚠️ Low Stock</h2>
                    <LowStock />
                </div>
            </div>

            {/* Finance Summary */}
            <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold text-red-600 text-center border-b pb-2 mb-4">📈 Today's Summary</h2>
                <table className="w-full text-sm text-left">
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Completed Orders</td>
                            <td className="py-2">{todayTotalOrderCompleted}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-medium">Total Sale</td>
                            <td className="py-2">Tk {todayTotalSale}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Total Refund</td>
                            <td className="py-2">Tk {todayTotalRefund}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainLayout;