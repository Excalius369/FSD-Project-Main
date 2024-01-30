// ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  // Fetch products data from backend API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('your-backend-api-url/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`your-backend-api-url/products/${productId}`, {
        method: 'DELETE',
      });
      // Update products state after deletion
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>{product.price}</Td>
              <Td>{product.description}</Td>
              <Td>
                <Button>Edit</Button>
                <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Add forms for adding and updating product information here */}
    </div>
  );
};

export default ProductManagement;
