import { Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <Sidebar></Sidebar> */}
            <Outlet></Outlet>
            <h1>Footer</h1>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Root;