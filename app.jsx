import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import "./App.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1>🌿 Paradise Nursery</h1>
      <p>
        Welcome to Paradise Nursery, your one-stop shop for beautiful houseplants.
        Discover a variety of plants to brighten your home and improve your space.
      </p>
      <button onClick={() => navigate("/products")}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;
