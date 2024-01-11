import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';

const shoes = [ { id: 1, name: 'BLAZER MID 77 VINTAGE BLACK/WHITE', brandname: 'NIKE', <image src={require('./a+')} />},
  { id: 2, name: 'Running Shoes', brandname: 'ADIDAS', image: 'https://www.superkicks.in/cdn/shop/files/2_90.jpg?v=1698918266&width=360' },
  { id: 3, name: 'High-Top Boots', brandname: 'PUMA', image: 'https://www.superkicks.in/cdn/shop/files/2_17c54df1-1f88-44eb-8cec-6937384d5fe3.jpg?v=1694511351&width=360' },
  { id: 4, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },
  { id: 5, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },
  { id: 6, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },
  { id: 7, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },
  { id: 8, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },
  { id: 9, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },
  { id: 10, name: 'Casual Footwear', brandname: 'REEBOK', image: 'https://www.superkicks.in/cdn/shop/files/2_26117081-4444-4d08-a0a0-b546c2e0aff5.jpg?v=1700634080&width=360' },

  // Add more shoe data as needed...


  // Your shoe data...
];

const StyledCard = styled(motion.div)`
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

// Animated hover effect
const hoverAnimation = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

// Framer motion variant
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

const CardLink = forwardRef(({ to, children }, ref) => (
  <Link to={to} style={{ textDecoration: 'none' }} ref={ref}>
    <div>{children}</div>
  </Link>
));

const ProductCard = ({ shoe }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <CardLink to={`/product/${shoe.id}`}>
        <StyledCard
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          whileHover={isHovered ? hoverAnimation : {}}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <StyledCardMedia component="img" height="200" image={shoe.image} alt={shoe.name} />

          <StyledCardContent>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {shoe.brandname}
            </Typography>
            <Typography variant="body1">{shoe.name}</Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
              ${/* Add actual price here */}99.99
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
      </CardLink>
    </Grid>
  );
};

const GridComponent = () => {
  return (
    <Grid container spacing={4}>
      {shoes.map(shoe => (
        <ProductCard key={shoe.id} shoe={shoe} />
      ))}
    </Grid>
  );
};

export default GridComponent;
