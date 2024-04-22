import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing BrowserRouter and Link

import { Shop } from "./pages/shop/shop.jsx";
import Cart from "./pages/cart/cart.jsx";
import Checkout from "./pages/cart/checkout.jsx";
import { ShopContextProvider } from "./context/shop-context";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SalesReport from "./pages/salesreport/salesreport.jsx";
import RestockForm from "./pages/restock/res.jsx";
import RegisterCashier from "./components/RegisterCashier.js";
import BranchSelectionForm from "./pages/branchselection/branchselection.jsx";
// import HqSalesReport from "./pages/salesreport/HqSalesReport.Jsx";
// import Navbar from "./components/Navbar.jsx";
// import { app, analytics, firestore } from "./firebase";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
        {/* <Navbar/> */}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="register-cashier" element={<RegisterCashier />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shop" element={<Shop />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="sales-report" element={<SalesReport />} />
            {/* <Route path="hqReport" element ={<HqSalesReport />} /> */}
            <Route path="restock" element={<RestockForm />} />
            <Route path="branch-selection" element={<BranchSelectionForm />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
