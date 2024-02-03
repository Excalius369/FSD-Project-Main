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
  font-family: 'Poppins', sans-serif;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #3b3b3b;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 1rem;
  background: #755cde;
  font-weight: 500;
  color: #fff;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const AddButton = styled(Button)`
  float: right;
  text-decoration: none;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EditButton = styled(Button)`
  border-radius: 20px;
  margin-right: 6px;
  text-decoration: none;
`;

const DeleteButton = styled(Button)`
  border-radius: 20px;
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
            {products.map(product => (
              <tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.brandName}</Td>
                <Td>{product.price}</Td>
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
