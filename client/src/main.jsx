import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import { store } from "./app/store.js"; 
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
