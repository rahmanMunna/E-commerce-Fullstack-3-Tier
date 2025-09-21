import { Outlet } from 'react-router-dom';
import Navbar from './layouts/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <h1>Footer</h1>
        </div>
    );
};

export default Root;