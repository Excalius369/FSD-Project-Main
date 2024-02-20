import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { addProductToCart } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a; /* Dark background color */
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ProductContainer = styled.div`
  background-color: #333; /* Dark gray background color */
  color: #f2f2f2; /* Light gray text color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  animation: ${fadeIn} 0.5s ease;
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
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ProductBrand = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-style: italic;
  text-transform: capitalize;
  margin-top: 10px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const AddToCartButton = styled.button`
  background-color: #ff6b6b; /* Red */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e74c3c; /* Darker red */
  }
`;

const BuyNowButton = styled.button`
  background-color: #3498db; /* Blue */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9; /* Darker blue */
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const SelectorLabel = styled.label`
  font-size: 16px;
`;

const Selector = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const getUserId = () => {
    return sessionStorage.getItem('userId');
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
          quantity: quantity,
          size: size,
        });
        
        dispatch(addProductToCart({ userId: getUserId(), productId: storedProductId }));
        
        Swal.fire({
          icon: 'success',
          title: 'Product added to cart!',
          text: `${product.name} has been added to your cart.`,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        // Show error message in console
        console.log('Failed to add product to cart');
      }
    }
  };

  const handleBuyNow = () => {
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
    // Redirect to order placement page
    navigate('/order-placement');
  };

  return (
    <Container>
      <ProductContainer>
        {product && (
          <>
            <ProductImageWrapper>
              <ProductImage src={product.img} alt={product.name} />
            </ProductImageWrapper>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductBrand>{product.brandName}</ProductBrand>
            <ProductPrice>₹{product.price}</ProductPrice>
            <SelectorContainer>
              <SelectorLabel htmlFor="quantity">Quantity:</SelectorLabel>
              <Selector id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </Selector>
            </SelectorContainer>
            <SelectorContainer>
              <SelectorLabel htmlFor="size">Size:</SelectorLabel>
              <Selector id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </Selector>
            </SelectorContainer>
            <ButtonContainer>
              <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
              <BuyNowButton onClick={handleBuyNow}>Buy Now</BuyNowButton>
            </ButtonContainer>
          </>
        )}
      </ProductContainer>
    </Container>
  );
};

export default ProductPage;
