import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Grid from '../components/Grid';
import Footer from '../components/Footer'; // Remove the import of Footer here
import ProductPage from '../components/ProductPage';

const Home = () => {
  useEffect(() => {
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'Cache-Control';
    metaTag.content = 'no-cache, no-store, must-revalidate';
    metaTag.setAttribute('pragma', 'no-cache');
    metaTag.setAttribute('expires', '0');
    document.head.appendChild(metaTag);

    // Cleanup function to remove the meta tag when the component unmounts
    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  return (
    <div className='container'>
      <Announcement />
      <Slider />
      <Routes>
        {/* Render the Grid component when at the root path */}
        <Route path="/" element={<Grid />} />

        {/* Render the ProductPage component when at the specific product path */}
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      {/* Remove the Footer component from here */}
    </div>
  );
}

export default Home;
