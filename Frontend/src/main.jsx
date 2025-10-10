import React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from './router/AppRouter.jsx';
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AnalyticsProvider } from "./context/AnalyticsContext.jsx";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AnalyticsProvider>
          <RouterProvider router={router} />
        </AnalyticsProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
