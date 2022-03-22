import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrdersHistory from '../pages/OrdersHistory'
import RegistrationPage from "../pages/RegistrationPage";
import ProductInfo from "../pages/ProductInfo";
import AdminPage from "../pages/Admin";


const AppRouter = () => {
  return (
    <>
      {/* ToastContainer from React toastify to show success and error messages */}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/productinfo/:productId"
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/ordershistory"
            exact
            element={
              <ProtectedRoutes>
                <OrdersHistory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <AdminPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/registration" exact element={<RegistrationPage />} />
          <Route path="/login" exact element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

//To keep the restriction for all routes by default
const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("loginUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AppRouter;
