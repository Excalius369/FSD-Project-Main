import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const RegisterPageContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 background-color: #f8f9fa;
`;

const RegisterForm = styled.form`
 background-color: #fff;
 border-radius: 10px;
 box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
 padding: 30px;
 width: 400px; /* Increased width for additional fields */
 text-align: center;
`;

const Input = styled.input`
 width: 100%;
 padding: 12px;
 margin-bottom: 20px;
 border: 1px solid #ddd;
 border-radius: 5px;
 font-size: 16px;
`;

const Button = styled.button`
 width: 100%;
 padding: 15px;
 background: linear-gradient(to right, #fc4a1a, #f7b733);
 color: #fff;
 border: none;
 border-radius: 5px;
 font-size: 18px;
 cursor: pointer;
 transition: background 0.3s ease-in-out;

 &:hover {
    background: linear-gradient(to right, #fc4a1a, #f7b733);
 }
`;

const LoginLink = styled.span`
 color: #333;
 font-size: 14px;
 margin-top: 10px;
 display: block;

 a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
 }
`;

const Register = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [createPassword, setCreatePassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

 const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username: name,
        email,
        password: createPassword,
      });

      const data = await response.json();

      if (data.success) {
        console.log('Registration successful:', data.message);
        // Redirect or perform other actions after successful registration
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
 };

 return (
    <RegisterPageContainer>
      <RegisterForm>
        <h2 style={{ color: '#333' }}>Register</h2>
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Create Password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="button" onClick={handleRegister}>
          Register
        </Button>
        <LoginLink>
          Already have an account? <a href="/login">Login</a>
        </LoginLink>
      </RegisterForm>
    </RegisterPageContainer>
  );
};

export default Register;
