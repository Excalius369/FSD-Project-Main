// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductPage from './components/ProductPage';
import Layout from './components/Layout';
import Footwear from './components/Footwear';
import Cart from './components/Cart';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
        <Route path="/footwears" element={<Layout><Footwear /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} /> {/* Add this line for the cart page */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
