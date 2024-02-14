import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Exclude Navbar and Footer from Register and Login pages
  const excludeNavbarFooter = location.pathname.includes('/register') || location.pathname.includes('/login');

  // Exclude logout button from being rendered on every page, including logout page
  const excludeLogoutButton = location.pathname === '/logout';

  return (
    <>
      {!excludeNavbarFooter && <Navbar />}
      {children}
      {!excludeNavbarFooter && !excludeLogoutButton && <Footer />}
    </>
  );
};

export default Layout;
