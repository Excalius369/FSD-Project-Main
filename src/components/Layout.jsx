import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Exclude Navbar and Footer from Register and Login pages
  const excludeNavbarFooter = location.pathname.includes('/register') || location.pathname.includes('/login');

  return (
    <>
      {!excludeNavbarFooter && <Navbar />}
      {children}
      {!excludeNavbarFooter && <Footer />}
    </>
  );
};

export default Layout;
