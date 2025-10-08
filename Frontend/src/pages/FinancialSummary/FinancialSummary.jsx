const FinancialSummary = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-3">Financial Summary</h1>
            <div className="flex flex-col justify-end items-center font-bold text-2xl mb-4 ">
                <form action="">
                    <span className="text-green-500">From :</span> <input type="date" name="" id="" />
                    <span className="text-red-600">To :</span> <input type="date" name="" id="" />
                    <div className="flex gap-3">
                        <h1>Date Range : </h1>
                        <span>0/0/0 - 0/0/0</span>
                    </div>
                </form>
            </div>
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
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

                <tbody className="divide-y divide-gray-100 text-gray-800 bg-white">
                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Total Sale (Gross Revenue)</td>
                        <td className="px-6 py-3 text-green-600 font-semibold">+ Tk 0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Total Refunds (Credit)</td>
                        <td className="px-6 py-3 text-red-600 font-semibold">- Tk 0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Total Orders</td>
                        <td className="px-6 py-3">0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Completed Orders</td>
                        <td className="px-6 py-3">0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Pending Orders</td>
                        <td className="px-6 py-3">0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Average Order Value</td>
                        <td className="px-6 py-3">Tk 0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Highest Order Value</td>
                        <td className="px-6 py-3 text-green-700 font-semibold">Tk 0</td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-3 font-medium">Lowest Order Value</td>
                        <td className="px-6 py-3 text-red-700 font-semibold">Tk 0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FinancialSummary;