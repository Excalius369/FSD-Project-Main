import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';

const OrderContainer = styled.div`
  display: flex;
`;

const OrderContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #1a1a2e;
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
  justify-content: space-between;
  align-items: center;
  animation: ${fadeIn} 0.5s ease;
  background: linear-gradient(to right, #1f1f1f, #333);
  transition: transform 0.2s ease;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
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
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const DeliveryStatusButton = styled.button`
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SelectUser = styled.select`
  padding: 10px;
  border-radius: 5px;
  background-color: #3b3b3b;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4b4b4b;
  }

  &:focus {
    background-color: #4b4b4b;
  }
`;

const Option = styled.option`
  background-color: #3b3b3b;
  color: #fff;
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders/');
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
        fetchOrders();
        Swal.fire({
          icon: 'success',
          title: 'Order Cancelled',
          text: 'The order has been successfully cancelled.',
        });
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/orders/update-delivery-status/${orderId}`, { deliveryStatus: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const filteredOrders = selectedUser ? orders.filter(order => order.user.username === selectedUser) : orders;

  return (
    <OrderContainer>
      <Sidebar />
      <OrderContent>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Order Management (Admin)</h2>
        <SelectUser value={selectedUser} onChange={handleUserChange}>
          <Option value="">All Users</Option>
          {Array.from(new Set(orders.map(order => order.user.username))).map(username => (
            <Option key={username} value={username}>{username}</Option>
          ))}
        </SelectUser>
        {filteredOrders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          filteredOrders.map((order) => (
            <OrderItem key={order._id}>
              <ProductImage src={order.product.img} alt={order.product.name} />
              <ProductDetails>
                <ProductName>{order.product.name}</ProductName>
                <ProductPrice>{order.product.brandName}</ProductPrice>
                <ProductPrice>Price: ₹{order.product.price}</ProductPrice>
                <DeliveryStatus delivered={order.deliveryStatus === 'Delivered'}>
                  Delivery Status: {order.deliveryStatus}
                </DeliveryStatus>
                <p>User: {order.user.username}</p>
              </ProductDetails>
              <ButtonContainer>
                <CancelButton onClick={() => cancelOrder(order._id)}>Cancel</CancelButton>
                <DeliveryStatusButton onClick={() => updateDeliveryStatus(order._id, 'Delivered')}>
                  Mark as Delivered
                </DeliveryStatusButton>
              </ButtonContainer>
            </OrderItem>
          ))
        )}
      </OrderContent>
    </OrderContainer>
  );
};

export default OrderManagement;
