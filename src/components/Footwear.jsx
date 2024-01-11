// Footwear.jsx
import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';

const footwearData = [
  { id: 1, name: 'Running Shoes', brandname: 'Nike', image: 'https://example.com/running-shoes.jpg' },
  { id: 2, name: 'Basketball Sneakers', brandname: 'Adidas', image: 'https://example.com/basketball-sneakers.jpg' },
  { id: 3, name: 'Casual Boots', brandname: 'Puma', image: 'https://example.com/casual-boots.jpg' },
  { id: 3, name: 'Casual Boots', brandname: 'Puma', image: 'https://example.com/casual-boots.jpg' },
  { id: 3, name: 'Casual Boots', brandname: 'Puma', image: 'https://example.com/casual-boots.jpg' },
  { id: 3, name: 'Casual Boots', brandname: 'Puma', image: 'https://example.com/casual-boots.jpg' },

  // Add more footwear data as needed...
];

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

const Footwear = () => {
  return (
    <Grid container spacing={4}>
      {footwearData.map((footwear) => (
        <Grid item key={footwear.id} xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardMedia component="img" height="200" image={footwear.image} alt={footwear.name} />
            <StyledCardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {footwear.brandname}
              </Typography>
              <Typography variant="body1">{footwear.name}</Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                {/* You can add actual price here */}
                $99.99
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

export default Footwear;
