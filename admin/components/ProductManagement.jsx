import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  display: flex;
  font-family: 'Montserrat', sans-serif;
  background-color: #1a1a2e; /* Dark blue background color */
  min-height: 100vh;
  color: white; /* White text color */
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #262b3e; /* Darker background color */
  border-radius: 10px;
  overflow-x: auto;
  display: block;
`;

const Th = styled.th`
  padding: 1.5rem;
  background: #4a90e2;
  font-weight: 700;
  color: white; /* White text color */
  text-align: left;
`;

const Td = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid #666666; /* Lighter border color */
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #fcbf49;
  color: #262626; /* Dark shiny color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f3b707;
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #da190b;
  }
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductName = styled.span`
  color: white; /* White text color */
`;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        <ButtonContainer>
          <AddButton onClick={() => navigate('/add-product')}>Add Product</AddButton>
        </ButtonContainer>
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
                <Td>
                  <ProductImage src={product.img} alt={product.name} />
                  <ProductName>{product.name}</ProductName>
                </Td>
                <Td>{product.brandName}</Td>
                <Td>₹{product.price}</Td>
                <Td>{product.category}</Td>
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

export default ProductManagement;
