import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../redux/cartActions';
import axios from 'axios';
import PaymentForm2 from './PaymentForm2';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';


const Container = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #1a1a1a, #333333); /* Glossy black gradient */
  color: #f9fafb;
`;

const ProductContainer = styled.div`
  margin-bottom: 30px;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #1a1a2e; /* Dark blue border color */
  background: linear-gradient(to right, #1f1f1f, #333);
  margin-bottom: 15px;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductText = styled.div`
  flex-grow: 1;
`;

const ProductName = styled.h3`
  color: #f9fafb;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  color: #f9fafb;
  margin-bottom: 5px;
`;

const Quantity = styled.span`
  color: #f9fafb;
  margin-right: 10px;
`;

const Subtotal = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const UserContainer = styled.div`
  margin-top: 50px;
`;

const UserFormGroup = styled.div`
  margin-bottom: 20px;
`;

const UserLabel = styled.label`
  color: #f9fafb;
  display: block;
  margin-bottom: 5px;
`;

const UserInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #212121; /* Glossy black color */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #424242; /* Darker glossy black color on hover */
  }
`;

const CartOrderPlacement = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.cart);
  const userId = sessionStorage.getItem('userId');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId))
        .catch(error => console.error("Error fetching cart items:", error));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (products && products.length > 0) {
      const subtotalValue = products.reduce((acc, cur) => acc + (cur.quantity * cur.product.price), 0);
      setSubtotal(subtotalValue);
    } else {
      setSubtotal(0);
    }
  }, [products]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const userData = response.data;
        setName(userData.username);
        setAddress(userData.address);
        setContact(userData.contact);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are no products in the cart
    if (!products || products.length === 0) {
      Swal.fire({
        title: 'Cart is Empty',
        text: 'There are no products in the cart to purchase.',
        icon: 'error',
      }).then(() => {
        // Redirect to the homepage
        navigate('/');
      });
      return;
    }

  
    // Check if name, address, and contact are not empty
    if (!name || !address || !contact) {
      alert('Please fill in all the fields.');
      return;
    }
  
    // Proceed to show the payment form if all fields are filled
    setShowPaymentForm(true);
  };
  

  const closePaymentForm = () => {
    setShowPaymentForm(false);
    setOrderPlaced(false); // Reset orderPlaced state to false
  };
  
  return (
    <Container>
      <h1>Order Placement</h1>
      <ProductContainer>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <ProductDetails key={index}>
              <ProductImage src={product.product.img} alt={product.product.name} />
              <ProductText>
                <ProductName>{product.product.name}</ProductName>
                <ProductPrice>Price: ₹{product.product.price}</ProductPrice>
              </ProductText>
              <Quantity>Quantity: {product.quantity}</Quantity>
            </ProductDetails>
          ))
        ) : (
          <p>No products in the cart</p>
        )}
      </ProductContainer>
      <Subtotal>Subtotal: ₹{subtotal}</Subtotal>
      <UserContainer>
        <h2>User Details</h2>
        <form onSubmit={handleSubmit}>
          <UserFormGroup>
            <UserLabel htmlFor="name">Name</UserLabel>
            <UserInput type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </UserFormGroup>
          <UserFormGroup>
            <UserLabel htmlFor="address">Address</UserLabel>
            <UserInput type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </UserFormGroup>
          <UserFormGroup>
            <UserLabel htmlFor="contact">Contact</UserLabel>
            <UserInput type="text" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
          </UserFormGroup>
          <Button type="submit">Place Order</Button>
        </form>
      </UserContainer>
      {showPaymentForm && (
        <PaymentForm2
        subtotal={subtotal} // Pass the correct subtotal to PaymentForm2
          closePaymentModal={closePaymentForm}
          setOrderPlaced={setOrderPlaced}
        />
      )}
      {orderPlaced && <p>Order has been successfully placed!</p>}
    </Container>
  );
};

export default CartOrderPlacement;
