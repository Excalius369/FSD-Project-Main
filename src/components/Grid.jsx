import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';

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
  object-fit: contain;
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

const CardLink = ({ to, children }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div>{children}</div>
  </Link>
);

const ProductCard = ({ shoe }) => (
  <Grid item xs={12} sm={6} md={4}>
    <CardLink to={`/product/${shoe._id}`}>
      <StyledCard
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        whileHover={hoverAnimation}
      >
        <StyledCardMedia component="img" height="200" image={shoe.img} alt={shoe.name} />
        <StyledCardContent>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            {shoe.brandname}
          </Typography>
          <Typography variant="body1">{shoe.name}</Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
          ₹{shoe.price}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <IconButton>
              <FavoriteBorderOutlinedIcon style={{ color: '#ff4e50' }} />
            </IconButton>
            <Button variant="contained" color="primary" style={{ borderRadius: '20px', marginTop: '8px' }}>
              View Product
            </Button>
          </div>
        </StyledCardContent>
      </StyledCard>
    </CardLink>
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
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  return (
    <>
      <Grid container spacing={4}>
        {products.map(product => (
          <ProductCard key={product._id} shoe={product} />
        ))}
      </Grid>
      <ToastContainer />
    </>
  );
};

export default GridComponent;
