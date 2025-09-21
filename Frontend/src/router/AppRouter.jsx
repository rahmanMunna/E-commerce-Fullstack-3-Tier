import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import ProductList from "../pages/Products/ProductList";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Root></Root>,
        children : [
            {
                path : "/productList",
                element : <ProductList></ProductList>
            },
            
        ]
    }
    
]);

export default router;