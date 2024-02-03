import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
  object-fit: cover;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  padding: 16px;
  text-align: center;
`;

const SneakerCare = () => {
  const [sneakerCareData, setSneakerCareData] = useState([]);

  useEffect(() => {
    fetchSneakerCareProducts();
  }, []);

  const fetchSneakerCareProducts = async () => {
    try {
      // Fetch products by category "sneaker care" from API
      const response = await fetch('http://localhost:3000/api/products?category=sneaker care');
      if (!response.ok) {
        throw new Error('Failed to fetch sneaker care products');
      }
      const data = await response.json();
      setSneakerCareData(data);
    } catch (error) {
      console.error('Error fetching sneaker care products:', error);
      // Handle error, e.g., show a toast message
    }
  };

  return (
    <Grid container spacing={4}>
      {sneakerCareData.map((footwear) => (
        <Grid item key={footwear._id} xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia component="img" height="200" image={footwear.img} alt={footwear.name} />
            <StyledCardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {footwear.brandname}
              </Typography>
              <Typography variant="body1">{footwear.name}</Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                {/* You can add actual price here */}
                ₹{footwear.price}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <IconButton>
                  <FavoriteBorderOutlinedIcon style={{ color: '#ff4e50' }} />
                </IconButton>
                <Button variant="contained" color="primary" startIcon={<AddShoppingCartIcon />} style={{ borderRadius: '20px', marginTop: '8px' }}>
                  Add to Cart
                </Button>
              </div>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default SneakerCare;
