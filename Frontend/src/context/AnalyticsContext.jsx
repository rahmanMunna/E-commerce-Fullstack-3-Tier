import { createContext, useEffect, useState } from "react";
import api from "../Interceptor/Api";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {

    // const [todayTotalOrderCompleted, setTodayTotalOrderCompleted] = useState(0);
    // const [todayTotalSale, setTodayTotalSale] = useState(0);
    // const [todayTotalRefund, setTodayTotalRefund] = useState(0);

    const loadData = async (url,setFunction) => {
        try {
            const res = await api.get(url);
            if (res.status === 200 && res.data !== null) {
                 setFunction(res.data);
                 return
            }
            console.log("Server Issue");

        } catch (err) {
            console.error(err.message)
        }
    }

    // const loadAllData = () => {
        // loadData("orderAnalytics/totalOrderCompleted", setTodayTotalOrderCompleted);
        // loadData("financial/todayTotalSale", setTodayTotalSale);
        // loadData("financial/todayTotalRefund", setTodayTotalRefund);
    // }

    // useEffect(() => {
    //     loadAllData();
    // }, [])


    return (
        // <AnalyticsContext.Provider value={{ todayTotalOrderCompleted, todayTotalSale, todayTotalRefund }}>
        <AnalyticsContext.Provider value={{loadData }}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export default AnalyticsContext;