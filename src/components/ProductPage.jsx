import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalStyles } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addProductToCart } from '../redux/store';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ProductContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  animation: fade-in 0.5s ease;
`;

const ProductImageWrapper = styled.div`
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  color: #333;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProductBrand = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-style: italic;
  text-transform: capitalize;
  color: #555;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const AddToCartButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`;

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);

        // Store the product ID in session storage
        sessionStorage.setItem('productId', response.data._id);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const getUserId = () => {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID retrieved:', userId);
    return userId; // Return null if userId is not found in sessionStorage
  };

  const handleAddToCart = async () => {
    
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to continue shopping.',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate('/login');
      return;
    }
  
    const storedProductId = sessionStorage.getItem('productId');

    if (product && storedProductId) {
      try {
        await axios.post('http://localhost:3000/api/cart', {
          user: getUserId(),
          product: storedProductId,
          quantity: 1,
        });
        
        dispatch(addProductToCart({ userId: getUserId(), productId: storedProductId }));

        Swal.fire({
          icon: 'success',
          title: 'Product added to cart!',
          text: `${product.name} has been added to your cart.`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: 'popup-class',
            icon: 'icon-class',
            title: 'title-class', 
            content: 'content-class',
          },
          showClass: {
            popup: 'animate__animated animate__fadeInDown popup-class',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp popup-class',
          },
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <ProductContainer>
          {product && (
            <>
              <ProductImageWrapper>
                <ProductImage
                  src={product.img}
                  alt={product.name}
                />
              </ProductImageWrapper>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductBrand>{product.brandName}</ProductBrand>
              <ProductPrice>₹{product.price}</ProductPrice>
              <AddToCartButton
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </AddToCartButton>
            </>
          )}
        </ProductContainer>
      </Container>
    </>
  );
};

export default ProductPage;
