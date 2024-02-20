import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: #333;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-in-out;
  max-width: 800px;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 16px;
  background-color: #444;
  color: white;

  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 5px rgba(108, 99, 255, 0.3);
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#6c63ff' : '#ccc')};
  color: ${(props) => (props.primary ? 'white' : '#333')};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-right: 10px;

  &:hover {
    background-color: ${(props) => (props.primary ? '#5a52d9' : '#bbb')};
  }
`;

const DebitCard = styled.div`
  background-color: #222;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 85mm;
  height: 53.98mm;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(
    45deg,
    #222 25%,
    transparent 25%,
    transparent 50%,
    #222 50%,
    #222 75%,
    transparent 75%,
    transparent
  );

  &:before {
    content: 'VISA';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    padding: 0.2rem 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
  }
`;

const CardNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  letter-spacing: 0.2rem;
  span {
    margin-right: 0.3rem;
  }
`;

const CardDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const CardDetailsItem = styled.div`
  margin-right: 1rem;
  font-size: 0.8rem;
`;

const ProtectedInput = styled.div`
  position: relative;
  font-family: monospace;
  font-size: 0.8rem;
  color: #999;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '•••';
  }
`;

const PaymentForm = ({ product, amount, closePaymentModal, setOrderPlaced }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      setPaymentDetails({ ...paymentDetails, [name]: value.slice(0, 16) });
    } else {
      setPaymentDetails({ ...paymentDetails, [name]: value });
    }
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
  
    // Retrieve userId and productId from sessionStorage
    const userId = sessionStorage.getItem('userId');
    const productId = sessionStorage.getItem('productId');
  
    if (!userId || !productId) {
      console.error('User ID or Product ID not found in sessionStorage');
      return;
    }
  
    Swal.fire({
      title: 'Confirm Payment',
      text: `Do you want to proceed with the payment of ₹${amount} for ${product}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6c63ff',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          // Simulate API call to process payment
          const response = await axios.post('http://localhost:3000/api/orders/', {
            user: userId, // Include userId in the request body
            product: productId, // Include productId in the request body
            amount: amount,
          });
          console.log('Order response:', response.data); // Log the response
          setIsLoading(false);
          setPaymentSuccess(true);
          setOrderPlaced(true);
          Swal.fire({
            title: 'Payment Successful!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
          }).then(() => {
            closePaymentModal();
          });
        } catch (error) {
          console.error('Error storing order details:', error);
          setIsLoading(false);
          Swal.fire({
            title: 'Error',
            text: 'Failed to store order details.',
            icon: 'error',
          });
        }
      }
    });
  };
  
  return (
    <>
      {isLoading && (
        <ModalOverlay>
          <ModalContent>Loading...</ModalContent>
        </ModalOverlay>
      )}
      <ModalOverlay>
        <ModalContent>
          <h2>Payment Details</h2>
          <p>Product: {product}</p>
          <p>Amount: ₹{amount}</p>

          <DebitCard>
            <CardNumber>
              {paymentDetails.cardNumber
                ? paymentDetails.cardNumber.replace(/(.{4})/g, '$1 ').trim()
                : '•••• •••• •••• ••••'}
            </CardNumber>
            <CardDetails>
              <CardDetailsItem>Expiry: {paymentDetails.expiryDate || 'MM/YY'}</CardDetailsItem>
              <CardDetailsItem>
                <ProtectedInput>{paymentDetails.cvv || '•••'}</ProtectedInput>
              </CardDetailsItem>
            </CardDetails>
            <div>{paymentDetails.name || 'John Doe'}</div>
          </DebitCard>

          {!isLoading && !paymentSuccess && (
            <form onSubmit={handlePayNow}>
              <FormGroup>
                <Label htmlFor="cardNumber">Card Number:</Label>
                <Input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                  maxLength={16}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="expiryDate">Expiry Date (MM/YY):</Label>
                <Input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                  maxLength={5}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="cvv">CVV:</Label>
                <ProtectedInput>
                  <Input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={3}
                  />
                </ProtectedInput>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="name">Name on Card:</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={paymentDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <Button type="submit" primary>
                Pay Now
              </Button>
              <Button type="button" onClick={closePaymentModal}>
                Cancel
              </Button>
            </form>
          )}
          {paymentSuccess && <p>Payment successful!</p>}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default PaymentForm;
