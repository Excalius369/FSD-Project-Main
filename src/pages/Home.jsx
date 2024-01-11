import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Grid from '../components/Grid';
import Footer from '../components/Footer';
import ProductPage from '../components/ProductPage';

const Home = () => {
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
      {/* Footer is included in Layout component */}
    </div>
  );
}

export default Home;
