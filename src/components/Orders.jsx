import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';

// Styled Components
const OrderContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #1a1a2e; /* Dark blue background color */
  color: #fff;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const OrderItem = styled.div`
  border: 2px solid #1f1f1f;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between; /* Align items to the right */
  align-items: center; /* Center vertically */
  animation: ${fadeIn} 0.5s ease;
  background: linear-gradient(to right, #1f1f1f, #333);
  transition: transform 0.2s ease;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  margin: 0 auto; /* Horizontally center */
  max-width: 800px; /* Limit maximum width */
  width: 100%; /* Take full width */
  margin-bottom: 20px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #fff;
`;

const ProductPrice = styled.p`
  margin: 5px 0;
  color: #ddd;
`;

const DeliveryStatus = styled.p`
  font-weight: bold;
  color: ${(props) => (props.delivered ? '#4CAF50' : '#F44336')};
`;

const CancelButton = styled.button`
  background-color: #f44336; /* Red */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f; /* Darker red */
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
`;

const OrderedPage = () => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/orders/user/${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this order!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
        fetchOrders(userId); // Refresh orders after cancellation
        Swal.fire({
          icon: 'success',
          title: 'Order Cancelled',
          text: 'Your order has been successfully cancelled.',
        });
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <OrderContainer>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Orders</h2>
      {orders.length === 0 ? (
        <Message>No orders found.</Message>
      ) : (
        orders.map((order) => (
          <OrderItem key={order._id}>
            <ProductImage src={order.product.img} alt={order.product.name} />
            <ProductDetails>
              <ProductName>{order.product.name}</ProductName>
              <ProductPrice>{order.product.brandName}</ProductPrice>
              <ProductPrice>Price: ₹{order.product.price}</ProductPrice>
              <DeliveryStatus delivered={order.deliveryStatus === 'Delivered'}>
                Delivery Status: {order.deliveryStatus}
              </DeliveryStatus>
            </ProductDetails>
            <CancelButton onClick={() => cancelOrder(order._id)}>Cancel</CancelButton>
          </OrderItem>
        ))
      )}
    </OrderContainer>
  );
};

export default OrderedPage;
