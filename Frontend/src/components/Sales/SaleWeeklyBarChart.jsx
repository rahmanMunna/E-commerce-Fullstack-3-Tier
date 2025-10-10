import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import api from '../../Interceptor/Api';

const SaleWeeklyBarChart = () => {
    const [data, setData] = useState([])

    const loadData = async () => {
        try {
            const url = "financial/sales/weekly"
            const res = await api.get(url);
            if (res.status === 200 && res.data) {
                const formatted = res.data.map(item => ({
                    ...item,
                    Date: new Date(item.Date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })
                }));
                setData(formatted);
            }

        }
        catch (err) {
            console.error(err.message)
        }


    }

    useEffect(() => {
        loadData()

    }, [])
    return (
        <BarChart
                width={750}
                height={350}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4f46e5" barSize={40} radius={[8, 8, 0, 0]} />
            </BarChart>
        
    );
};

export default SaleWeeklyBarChart;