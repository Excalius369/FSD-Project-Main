import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchCartItems, removeCartItem, updateCartItem } from '../redux/cartActions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProductContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #3d5a80; /* Ocean Blue */
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

const CartIcon = styled(FontAwesomeIcon)`
  width: 60px;
  margin-bottom: 15px;
  color: #8b4513; /* Saddle Brown */
`;

const ProductImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StepperButton = styled.button`
  background-color: #f2cc8f; /* Sand Yellow */
  border: none;
  border-radius: 50%;
  color: #3d5a80; /* Ocean Blue */
  font-size: 14px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d8b67a; /* Darker Sand Yellow */
  }
`;

const QuantityDisplay = styled.div`
  margin: 0 10px;
  font-size: 14px;
  color: #3d5a80; /* Ocean Blue */
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BuyNowButton = styled.button`
  background-color: #00688b; /* Teal Blue */
  color: white;
  width: 100px;
  height: 50px;
  padding: 12px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.4s ease-in-out;

  &:hover {
    background-color: #004165; /* Darker Teal Blue */
  }
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const Subtotal = styled.div`
  text-align: left;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ProceedToBuyButton = styled.button`
  background-color: #008000; /* Green */
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.4s ease-in-out;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #006400; /* Darker Green */
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  

  // Move getUserId function declaration here
  const getUserId = () => {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID retrieved:', userId);
    return userId;
  };

  useEffect(() => {
    const userId = getUserId(); // Call getUserId here
    if (userId) {
      dispatch(fetchCartItems(userId))
        .catch(error => console.error("Error fetching cart items:", error));
    }
  }, [dispatch]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    dispatch(updateCartItem({ cartItemId: cartItemId, updatedData: { quantity: newQuantity } }));
  };

  const handleDelete = (productId) => {
    dispatch(removeCartItem(productId))
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Product Removed',
          text: 'The product has been successfully removed from your cart.',
        });
      })
      .catch(error => {
        console.error('Error removing product from cart:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while removing the product from your cart. Please try again.',
        });
      });
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.products) {
      return 0;
    }
  
    return cart.products.reduce(
      (total, product) =>
        total + product.product.price * product.quantity,
      0
    );
  };

  const cartItemCount = cart.products ? cart.products.length : 0;

  const handleProceedToBuy = () => {
    navigate('/cart-order-placement', { state: { products: cart.products, subtotal: calculateSubtotal() } });
  };

  return (
    <Container>
      <Header>
        <h1 style={{ color: '#3d5a80', fontSize: '24px' }}>Welcome to Cart</h1> 
      </Header>
      {cart && cart.products && cart.products.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <CartIcon icon={faShoppingCart} />
          <p style={{ color: '#8b4513', fontSize: '16px' }}>
            Oh no! Your cart is empty. Time to add some magic!
          </p>
        </div>
      ) : (
        <>
          <Subtotal>
            <strong>Subtotal: &#x20B9;{calculateSubtotal()}</strong>
          </Subtotal>
          <ProceedToBuyButton
            style={{ fontSize: '16px' }}
            onClick={handleProceedToBuy}
          >
            Proceed to Buy ({cartItemCount} items)
          </ProceedToBuyButton>
          <br />
          {cart.products && cart.products.map((product, index) => (
            <ProductContainer key={index}>
              <GridItem>
                <ProductImage src={product.product.img} alt={product.product.name} />
                <ProductDetails>
                  <h3 style={{ color: '#3d5a80', fontSize: '20px' }}>
                    {product.product.name}
                  </h3>
                  <p>{product.product.brandName}</p>
                  <p>₹{product.product.price}</p>
                </ProductDetails>
                <QuantityContainer>
                  <StepperContainer>
                    <StepperButton
                      onClick={() =>
                        handleQuantityChange(product._id, product.quantity - 1)
                      }
                    >
                      -
                    </StepperButton>
                    <QuantityDisplay>{product.quantity}</QuantityDisplay>
                    <StepperButton
                      onClick={() =>
                        handleQuantityChange(product._id, product.quantity + 1)
                      }
                    >
                      +
                    </StepperButton>
                  </StepperContainer>
                  &nbsp;&nbsp;
                  <DeleteIcon
                    icon={faTrash}
                    onClick={() => handleDelete(product._id)}
                  />
                </QuantityContainer>
              </GridItem>
            </ProductContainer>
          ))}
        </>
      )}
    </Container>
  );
};

export default Cart;
