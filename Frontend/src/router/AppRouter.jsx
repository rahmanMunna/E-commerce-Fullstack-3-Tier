import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import ProductList from "../pages/Products/ProductList";
import Cart from "../pages/Cart/Cart";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root></Root>,
        children : [
            {
                path : "/productList",
                element : <ProductList></ProductList>
            },
            {
                path : "/cart",
                element : <Cart></Cart>
            },
            
        ]
    }
    
]);

export default router;