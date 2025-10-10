import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";

const FinancialSummary = () => {

    const [summary, setSummary] = useState(null);

    const handlePickDate = (e) => {
        e.preventDefault();
        const fromDate = e.target.FromDate.value;
        const toDate = e.target.ToDate.value;

        if (fromDate === "" || toDate === "") {
            alert("PLease select date")
            return;
        }
        const StartDate = new Date(fromDate);
        const EndDate = new Date(toDate);
        if (StartDate > EndDate) {
            alert("Start Date must be less than End Date");
            return;
        }
        GenerateFinancialSummary({ StartDate, EndDate })
    }
    const GenerateFinancialSummary = async (dateRange = { StartDate: new Date(), EndDate: new Date() }) => {
        try {
            const url = "financial/summary";
            const res = await api.post(url, JSON.stringify(dateRange));
            if (res.status !== 200) {
                alert("Server Issue");
                return;
            }
            setSummary(res.data);

        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        GenerateFinancialSummary();
    }, [])

    console.log(summary)
    return (
        
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                📊 Financial Summary
            </h1>

            <form
                onSubmit={handlePickDate}
                className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8"
            >
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">From:</span>
                    <input
                        type="date"
                        name="FromDate"
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-red-600 font-semibold">To:</span>
                    <input
                        type="date"
                        name="ToDate"
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>
                <button
                    type="submit"
                    className="btn bg-blue-600 text-white px-5 py-2 rounded hover:btn-error transition"
                >
                    Generate
                </button>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide border-b">
                                Properties
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide border-b">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                        <SummaryRow
                            label="Total Sale (Gross Revenue)"
                            value={`+ Tk ${summary?.TotalSales}`}
                            valueClass="text-green-600 font-semibold"
                        />
                        <SummaryRow
                            label="Total Refunds (Credit)"
                            value={`- Tk ${summary?.TotalRefunds}`}
                            valueClass="text-red-600 font-semibold"
                        />
                        <SummaryRow label="Total Orders" value={summary?.TotalOrders} />
                        <SummaryRow label="Completed Orders" value={summary?.TotalCompletedOrders} />
                        <SummaryRow label="Pending Orders" value={summary?.TotalPendingOrders} />
                        <SummaryRow
                            label="Average Order Value"
                            value={`Tk ${summary?.AverageOrderAmount?.toFixed(2)}`}
                            valueClass="text-blue-500"
                        />
                        <SummaryRow
                            label="Highest Order Value"
                            value={`Tk ${summary?.HighestOrderAmount?.toFixed(2)}`}
                            valueClass="text-green-700 font-semibold"
                        />
                        <SummaryRow
                            label="Lowest Order Value"
                            value={`Tk ${summary?.LowestOrderAmount?.toFixed(2)}`}
                            valueClass="text-red-700 font-semibold"
                        />
                    </tbody>
                </table>
            </div>
        </div>

    );
};
const SummaryRow = ({ label, value, valueClass = '' }) => (
    <tr className="hover:bg-gray-50 transition">
        <td className="px-6 py-3 font-medium">{label}</td>
        <td className={`px-6 py-3 ${valueClass}`}>{value}</td>
    </tr>
);


export default FinancialSummary;