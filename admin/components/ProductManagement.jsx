import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 0px;
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(to right, #667eea, #764ba2);
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748; /* Dark blue-gray text */
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow-x: auto; /* Enable horizontal scrolling */
  max-width: 100%; /* Ensure table does not exceed container width */
  display: block; /* Enable vertical scrolling */
`;

const Th = styled.th`
  padding: 1.5rem;
  background: #4a90e2; /* Blue background */
  font-weight: 700;
  color: #fff; /* White text */
  text-align: left;
  white-space: nowrap; /* Prevent text wrapping */
`;

const Td = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid #cbd5e0; /* Light blue-gray border */
  font-weight: 500;
  white-space: nowrap; /* Prevent text wrapping */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #fcbf49; /* Yellow background */
  color: #2d3748; /* Dark blue-gray text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f3b707; /* Darker yellow on hover */
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const AddButton = styled(Button)`
  float: right;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Add gap between buttons */
`;

const EditButton = styled(Button)``;

const DeleteButton = styled(Button)`
  background-color: #e53e3e; /* Red background */
  color: #fff; /* White text */
`;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <PageTitle>Manage Products</PageTitle>
        <AddButton onClick={() => navigate('/add-product')}>Add Product</AddButton>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Price</Th>
              <Th>Category</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.brandName}</Td>
                <Td>₹{product.price}</Td> {/* Added dollar sign for price */}
                <Td>{product.category}</Td> {/* Added Category column */}
                <Td>
                  <ActionButtonsContainer>
                    <EditButton onClick={() => navigate(`/edit-product/${product._id}`)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDeleteProduct(product._id)}>Delete</DeleteButton>
                  </ActionButtonsContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ToastContainer />
      </Content>
    </DashboardContainer>
  );
};

// Remove the requirement for history prop
ProductManagement.propTypes = {
  history: PropTypes.object,
};

export default ProductManagement;
