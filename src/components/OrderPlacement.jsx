import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import PaymentForm from './PaymentForm';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const OrderSummary = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const ProductPrice = styled.p`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const DeliveryForm = styled.form`
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const PaymentMethod = styled.div`
  margin-bottom: 30px;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PaymentInput = styled.input`
  margin-right: 10px;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const PayNowButton = styled.button`
  padding: 15px 30px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }

  animation: ${pulseAnimation} 0.5s linear;
`;

const OrderPlacementPage = () => {
  const [product, setProduct] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '', // Corrected from username
    address: '',
    contact: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // State for managing payment popup
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    // Fetch product details from backend based on product ID stored in sessionStorage
    const productId = sessionStorage.getItem('productId');

    // Example fetch request, replace with your actual endpoint
    fetch(`http://localhost:3000/api/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Error fetching product details:', error));

    // Fetch user details from backend when component mounts
    const userId = sessionStorage.getItem('userId');

    // Example fetch request, replace with your actual endpoint
    fetch(`http://localhost:3000/api/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setDeliveryInfo({
          name: data.username, // Corrected from username
          address: data.address,
          contact: '', // Leave contact number empty initially
        });
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, []);

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOpenPaymentPopup = () => {
    setShowPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    handleOpenPaymentPopup();
  };

  return (
    <Container>
      <Header>Order Placement</Header>

      <OrderSummary>
        {/* Display product image and details */}
        {product && (
          <>
            <ProductImage src={product.img} alt={product.name} />
            <ProductDetails>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>₹{product.price}</ProductPrice>
            </ProductDetails>
          </>
        )}
      </OrderSummary>

      <DeliveryForm onSubmit={handlePayNow}>
        <h2>Delivery Information</h2>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="username" name="username" value={deliveryInfo.name} onChange={handleDeliveryInfoChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Address:</Label>
          <Input type="text" id="address" name="address" value={deliveryInfo.address} onChange={handleDeliveryInfoChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="contact">Contact Number:</Label>
          <Input type="text" id="contact" name="contact" value={deliveryInfo.contact} onChange={handleDeliveryInfoChange} />
        </FormGroup>

        <PaymentMethod>
          <h2>Payment Method</h2>
          <PaymentOption>
            <PaymentInput type="radio" id="credit_card" name="paymentMethod" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={handlePaymentMethodChange} />
            <Label htmlFor="credit_card">Credit Card</Label>
          </PaymentOption>
          <PaymentOption>
            <PaymentInput type="radio" id="paypal" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={handlePaymentMethodChange} />
            <Label htmlFor="paypal">PayPal</Label>
          </PaymentOption>
          {/* Add more payment options as needed */}
        </PaymentMethod>

        <PayNowButton type="submit">{orderPlaced ? 'Payment Processed!' : 'Pay Now'}</PayNowButton>
      </DeliveryForm>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <PaymentForm
         image={product.img}
          product={product.name} // Pass product name to PaymentForm
          amount={product.price} // Pass product price to PaymentForm
          closePaymentModal={handleClosePaymentPopup} // Pass function to close payment popup
          setOrderPlaced={setOrderPlaced} // Pass function to update order status
        />
      )}
    </Container>
  );
};

export default OrderPlacementPage;
