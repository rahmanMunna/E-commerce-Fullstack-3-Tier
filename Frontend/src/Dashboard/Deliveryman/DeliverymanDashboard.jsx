import { Outlet } from 'react-router-dom';
import DeliverymanSidebar from '../../layouts/Deliveryman/DeliverymanSidebar';
import DeliverymanNavbar from '../../layouts/Deliveryman/DeliverymanNavbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeliverymanDashboard = () => {

    return (
        <div className="flex flex-col h-screen">          
            <div className="w-full">
                <DeliverymanNavbar/>
            </div>
                  
            <div className="flex flex-1">                
                <div className="w-1/6">
                    <DeliverymanSidebar/>
                </div>

                {/* Main content area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <Outlet></Outlet>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default DeliverymanDashboard;