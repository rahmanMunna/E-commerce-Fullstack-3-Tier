import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import ProductList from "../pages/Products/ProductList";
import Cart from "../pages/Cart/Cart";
import AllPlacedOrders from "../pages/AllPlacedOrders/AllPlacedOrders";
import PlaceOrderDetails from "../pages/AllPlacedOrders/PlaceOrderDetails";
import ProcessingOrders from "../pages/ProcessingOrders/ProcessingOrders";
import AssignedOrders from "../pages/Deliveryman/AssignedOrders";
import OnTheWayOrders from "../pages/Deliveryman/OnTheWayOrders";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/productList",
                element: <ProductList></ProductList>
            },
            {
                path: "/cart",
                element: <Cart></Cart>
            },
            {
                path: "/allPlacedOrders",
                element: <AllPlacedOrders></AllPlacedOrders>
            },
            {
                path: "/viewPlaceOrderDetails/:Id",
                element: <PlaceOrderDetails></PlaceOrderDetails>
            },
            {
                path: "/processingOrders/",
                element: <ProcessingOrders></ProcessingOrders>
            },
            {
                path: "/assignedOrders/",
                element: <AssignedOrders></AssignedOrders>
            },
            {
                path: "/onTheWayOrders/",
                element: <OnTheWayOrders></OnTheWayOrders>
            },

        ]
    }

]);

export default router;