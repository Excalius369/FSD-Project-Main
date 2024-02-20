import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
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

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const SneakerCare = () => {
  const [sneakerCareData, setSneakerCareData] = useState([]);

  useEffect(() => {
    fetchSneakerCareProducts();
  }, []);

  const fetchSneakerCareProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products?category=sneaker care');
      if (!response.ok) {
        throw new Error('Failed to fetch sneaker care products');
      }
      const data = await response.json();
      setSneakerCareData(data);
    } catch (error) {
      console.error('Error fetching sneaker care products:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {sneakerCareData.map((footwear) => (
          <Grid item key={footwear._id} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledCardMedia component="img" height="200" image={footwear.img} alt={footwear.name} />
              <StyledCardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {footwear.brandName}
                </Typography>
                <Typography variant="body1">{footwear.name}</Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px', fontWeight: 'bold' }}>
                  ₹{footwear.price}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
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

export default SneakerCare;
