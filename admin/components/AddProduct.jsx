import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    img: '',
    category: '',
    size: [],
    price: '',
    inStock: true,
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'size' ? value.split(',').map((s) => s.trim()).filter(Boolean) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(formData.price) || formData.price <= 0) {
      setMessage('Price must be a positive number.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Product added successfully.');
        toast.success('Product added successfully');
        setTimeout(() => {
          navigate('/product-management');
        }, 2000);
      } else {
        setMessage('Error adding product. Please try again.');
        toast.error('Error adding product. Please try again');
      }
    } catch (error) {
      setMessage('Error adding product. Please try again.');
      toast.error('Error adding product. Please try again');
      console.error('Error adding product:', error);
    }
  };

  return (
    <FormContainer>
      <ToastContainer />
      <Title>Add New Product</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Product Name:</Label>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <Label>Brand Name:</Label>
        <Input type="text" name="brandName" value={formData.brandName} onChange={handleChange} required />

        <Label>Image URL:</Label>
        <Input type="text" name="img" value={formData.img} onChange={handleChange} required />

        <Label>Category:</Label>
        <Select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="sneaker">Sneaker</option>
          <option value="sneaker care">Sneaker Care</option>
        </Select>

        <Label>Size (Separate with commas):</Label>
        <Input type="text" name="size" value={formData.size.join(',')} onChange={handleChange} />

        <Label>Price:</Label>
        <Input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <Label>In Stock:</Label>
        <Select name="inStock" value={formData.inStock.toString()} onChange={handleChange} required>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>

        <Button type="submit">Add Product</Button>
      </Form>
      {message && <p>{message}</p>}
    </FormContainer>
  );
};

export default AddProduct;
