import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom'; // Import Link for navigation

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

const AddButton = styled(Button)`
  float: right;
  text-decoration: none; /* Remove underline */
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EditButton = styled(Button)`
  border-radius: 20px;
  margin-right: 6px;
  text-decoration: none; /* Remove underline */
`;

const DeleteButton = styled(Button)`
  border-radius: 20px;
`;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

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
        <h1>Product Management</h1>
        <AddButton as={Link} to="/add-product">Add Product</AddButton>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Price</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.brandName}</Td> {/* Render brandname field */}
                <Td>{product.price}</Td>
                <Td>
                  <ActionButtonsContainer>
                    <EditButton as={Link} to={`/edit-product/${product._id}`}>Edit</EditButton>
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

ProductManagement.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ProductManagement;
