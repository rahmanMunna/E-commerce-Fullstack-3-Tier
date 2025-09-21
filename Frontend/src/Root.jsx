import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <h1>Header</h1>
            <Outlet></Outlet>
            <h1>Footer</h1>
        </div>
    );
};

export default Root;