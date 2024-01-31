import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductPage from './components/ProductPage';
import Layout from './components/Layout';
import Footwear from './components/Footwear';
import Cart from './components/Cart';
import ProfilePage from './components/ProfilePage'; // Import ProfilePage component
import SneakerCare from './components/SneakerCare';
import ContactUs from './components/ContactUs';
import Dashboard from '../admin/components/Dashboard';
import AddProduct from '../admin/components/AddProduct';
import ProductManagement from '../admin/components/ProductManagement';
import UserManagement from '../admin/components/UserManagement';

const App = () => {
  // Define dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, City, Country',
    // Add more user details as needed
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
        {/* Pass user data to ProfilePage component */}
        <Route path="/profile" element={<Layout><ProfilePage user={user} /></Layout>} />
        <Route path="/sneakercare" element={<Layout><SneakerCare/></Layout>} />
        <Route path="/footwears" element={<Layout><Footwear /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactUs/></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user-management" element={<UserManagement/>} />
        <Route path="/product-management" element={<ProductManagement/>} />
        <Route path="/add-product" element={<AddProduct/>} />
      </Routes>
    </Router>
  );
}

export default App;
