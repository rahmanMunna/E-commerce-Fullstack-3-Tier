import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import ProductList from "../pages/Products/ProductList";
import Cart from "../pages/Cart/Cart";
import AllPlacedOrders from "../pages/AllPlacedOrders/AllPlacedOrders";
import PlaceOrderDetails from "../pages/AllPlacedOrders/PlaceOrderDetails";
import ProcessingOrders from "../pages/ProcessingOrders/ProcessingOrders";
import AssignedOrders from "../pages/Deliveryman/AssignedOrders";
import OnTheWayOrders from "../pages/Deliveryman/OnTheWayOrders";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import TrackOrders from "../pages/Orders/TrackOrders";
import CustomerDashboard from "../Dashboard/Customer/CustomerDashboard";
import DeliverymanDashboard from "../Dashboard/Deliveryman/DeliverymanDashboard";
import ManageProducts from "../pages/Products/Manage Products/ManageProducts";
import AddProduct from "../components/AddProduct";
import Login from "../pages/Authentication/Login";
import UnAuthorized from "../pages/Authentication/UnAuthorized";
import PrivateRoute from "./PrivateRoute";
import CustomerTrackOrders from "../pages/Customer/CustomerTrackOrders";
import MyOrders from "../pages/Customer/MyOrders";
import CancelledOrders from "../pages/Customer/CancelledOrders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,

    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized />,
    },

    // Admin Layout with nested routes
    {
        element: <PrivateRoute allowedRoles={["Admin"]} />,
        children: [
            {
                path: "/adminDashboard",
                element: <AdminDashboard />,
                children: [
                    { index: true, element: <AllPlacedOrders /> },
                    { path: "manageProducts", element: <ManageProducts /> },
                    { path: "processingOrders", element: <ProcessingOrders /> },
                    { path: "assignedOrders", element: <AssignedOrders /> },
                    { path: "trackOrders", element: <TrackOrders /> },
                    { path: "manageProducts/addProduct", element: <AddProduct /> },
                    { path: "viewPlaceOrderDetails/:Id", element: <PlaceOrderDetails /> },
                ],
            }
        ]

    },
    {
        element: <PrivateRoute allowedRoles={["Customer"]} />,
        children: [
            {
                path: "/customerDashboard",
                element: <CustomerDashboard />,
                children: [
                    { index: true, element: <ProductList /> },
                    { path: "trackOrders", element: <CustomerTrackOrders /> },
                    { path: "myOrders", element: <MyOrders /> },
                    { path: "cancelled", element: <CancelledOrders /> },
                    { path: "cart", element: <Cart /> },
                ],
            }
        ]
    },
    {
        element: <PrivateRoute allowedRoles={["Deliveryman"]} />,
        children: [
            {
                path: "/deliverymanDashboard",
                element: <DeliverymanDashboard />,
                children: [
                    { index: true, element: <AssignedOrders /> },
                    { path: "onTheWay", element: <OnTheWayOrders></OnTheWayOrders> }
                ],
            }
        ]
    },
]);

export default router;
