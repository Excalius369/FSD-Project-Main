import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchCartItems } from '../redux/cartActions'; // Import fetchCartItems action creator

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

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch]);

  const getUserId = () => {
    const userId = sessionStorage.getItem('userId');
    console.log('User ID retrieved:', userId);
    return userId; // Return null if userId is not found in sessionStorage
  };

  const userId = getUserId();
  useEffect(() => {
    const userId = getUserId(); // Move getUserId here
    if (userId) {
      dispatch(fetchCartItems(userId)); // Fetch cart items if userId exists
    }
  }, [dispatch]); 

  const handleQuantityChange = (productId, newQuantity) => {
    // Dispatch an action to update the quantity in the Redux store
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, newQuantity } });
  };

  const handleDelete = (productId) => {
    // Dispatch an action to remove the product from the Redux store
    dispatch({ type: 'REMOVE_PRODUCT', payload: { productId } });
  };

  const handleBuyNow = (product) => {
    console.log(`Buying ${product.quantity} ${product.name}(s)`);
    // Add your logic for handling the buy now action
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.products) {
      return 0; // or any default value you prefer
    }
  
    return cart.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    ).toFixed(2);
  };
  

  const cartItemCount = cart.products ? cart.products.length : 0;

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
          <ProceedToBuyButton style={{ fontSize: '16px' }}>
            Proceed to Buy ({cartItemCount} items)
          </ProceedToBuyButton>
          <br />
          {cart.products && cart.products.map((product) => (            <ProductContainer key={product._id}>
              <GridItem>
                <ProductImage src={product.img && product.img[0]} alt={product.name} />

                <ProductDetails>
                  <h3 style={{ color: '#3d5a80', fontSize: '20px' }}>
                    {product.name}
                  </h3>
                  <p>${product.price}</p>
                  <p>{product.description}</p>
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
                  <BuyNowButton onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </BuyNowButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

// Function to get user ID (Replace with actual implementation)
// Function to get user ID
const getUserId = () => {
  // Retrieve user ID from session storage, local storage, or Redux store
  // Replace 'userId' with the actual key you're using to store the user ID
  const userId = sessionStorage.getItem('userId');
  // If using local storage:
  // const userId = localStorage.getItem('userId');
  // If using Redux store:
  // const userId = useSelector((state) => state.auth.userId); // Replace 'auth' with your actual slice name

  return userId;
};


export default Cart;
