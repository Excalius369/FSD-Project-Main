import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Footwear = () => {
  const [footwearData, setFootwearData] = useState([]);

  useEffect(() => {
    fetchFootwear();
  }, []);

  const fetchFootwear = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/?category=sneaker');
      if (!response.ok) {
        throw new Error('Failed to fetch footwear');
      }
      const data = await response.json();
      setFootwearData(data);
    } catch (error) {
      console.error('Error fetching footwear:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {footwearData.map((footwear) => (
          <Grid item key={footwear._id} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledCardMedia component="img" height="200" image={footwear.img} alt={footwear.name} />
              <StyledCardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {footwear.brandname}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '16px' }}>{footwear.name}</Typography>
                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                  ₹{footwear.price}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <IconButton>
                    <FavoriteBorderOutlinedIcon style={{ color: '#ff4e50' }} />
                  </IconButton>
                  <Button component={Link} to={`/product/${footwear._id}`} variant="contained" color="primary" style={{ borderRadius: '20px' }}>
            View Product
          </Button>
                </div>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Footwear;
