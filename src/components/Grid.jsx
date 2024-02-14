import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledCard = styled(motion(Card))`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  padding: 16px;
  text-align: center;
`;

const hoverAnimation = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ProductCard = ({ shoe }) => (
  <Grid item xs={12} sm={6} md={4}>
    <StyledCard
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      whileHover={hoverAnimation}
    >
      <StyledCardMedia component="img" image={shoe.img} alt={shoe.name} />
      <StyledCardContent>
        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          {shoe.brandName}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '16px' }}>{shoe.name}</Typography>
        <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
          ₹{shoe.price}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton>
            <FavoriteBorderOutlinedIcon style={{ color: '#ff4e50' }} />
          </IconButton>
          <Button component={Link} to={`/product/${shoe._id}`} variant="contained" color="primary" style={{ borderRadius: '20px' }}>
            View Product
          </Button>
        </div>
      </StyledCardContent>
    </StyledCard>
  </Grid>
);

const GridComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/?category=sneaker');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <Grid container spacing={4}>
        {products.map(product => (
          <ProductCard key={product._id} shoe={product} />
        ))}
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default GridComponent;
