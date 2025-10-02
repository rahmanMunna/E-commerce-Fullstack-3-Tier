import React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from './router/AppRouter.jsx';
import { CartProvider}  from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
