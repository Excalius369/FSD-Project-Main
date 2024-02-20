import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProductPage from './components/ProductPage';
import Layout from './components/Layout';
import Footwear from './components/Footwear';
import Cart from './components/Cart';
import ProfilePage from './components/ProfilePage';
import SneakerCare from './components/SneakerCare';
// Adjusted import statement
import ContactUs from './components/ContactUs';
import Dashboard from '../admin/components/Dashboard';
import AddProduct from '../admin/components/AddProduct';
import ProductManagement from '../admin/components/ProductManagement';
import UserManagement from '../admin/components/UserManagement';
import EditProduct from '../admin/components/EditProduct';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin } from './redux/store';
import OrderPlacementPage from './components/OrderPlacement';
import PaymentForm from './components/PaymentForm';
import OrderedPage from './components/Orders';

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to the login page
    return <Navigate to="/login" replace />;
  };

  // Example usage to set isAdmin
  // dispatch(setAdmin(true));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/product/:id" element={<Layout><ProductPage /></Layout>} />
        <Route path="/profile" element={isLoggedIn ? <Layout><ProfilePage /></Layout> : <Navigate to="/login" />} />
        <Route path="/sneakercare" element={<Layout><SneakerCare/></Layout>} />
        <Route path="/footwears" element={<Layout><Footwear /></Layout>} />
        <Route path="/orderspage" element={<Layout><OrderedPage/></Layout>} /> {/* Corrected route */}
        <Route path="/contact-us" element={<Layout><ContactUs/></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/order-placement" element={<Layout><OrderPlacementPage/></Layout>} />
        <Route path="/payment-form" element={<Layout><PaymentForm/></Layout>} /> {/* Corrected route */}
        {isAdmin && (
          <>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/user-management" element={<UserManagement/>} />
            <Route path="/product-management" element={<ProductManagement/>} />
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="/edit-product/:id" element={<EditProduct/>} />
          </>
        )}
        {/* Add a route for logout */}
        <Route path="/logout" element={handleLogout} />
      </Routes>
    </Router>
  );
}

export default App;
