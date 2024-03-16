import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  PRODUCTS,
  ADD_PRODUCTS,
  SIGNIN,
  SIGNUP,
  CART,
  ORDERS,
  PROFILE,
  PRODUCT_LIST,
} from "../constants";

import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";

import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserData } from "../store/authSlice";
import AddProducts from "../components/addProducts/AddProducts";
import Products from "../components/products/Products";
import CartList from "../components/carts/CartList";
import OrderList from "../components/orders/Orders";
import Profile from "../components/profile/Profile";
import ProductList from "../components/admin/ProductList";

const publicRoutes = [
  {
    path: SIGNIN,
    element: <SignIn />,
  },
  {
    path: SIGNUP,
    element: <SignUp />,
  },
];

const privateRoutesAdmin = [
  {
    path: ADD_PRODUCTS,
    element: <AddProducts />,
  },
  {
    path: PRODUCTS,
    element: <Products />,
  },
  {
    path: CART,
    element: <CartList />,
  },
  {
    path: ORDERS,
    element: <OrderList />,
  },
  {
    path: PROFILE,
    element: <Profile />,
  },
  {
    path: PRODUCT_LIST,
    element: <ProductList />,
  },
];

const privateRoutesUser = [
  {
    path: PRODUCTS,
    element: <Products />,
  },
  {
    path: CART,
    element: <CartList />,
  },
  {
    path: ORDERS,
    element: <OrderList />,
  },
  {
    path: PROFILE,
    element: <Profile />,
  },
  {
    path: PRODUCT_LIST,
    element: <ProductList />,
  },
];

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUserData);

  return (
    <Routes>
      {isAuthenticated
        ? user?.role === "admin"
          ? privateRoutesAdmin.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
          : privateRoutesUser.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
        : publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to={PRODUCTS} />
          ) : (
            <Navigate to={SIGNIN} />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
