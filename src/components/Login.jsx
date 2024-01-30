import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1628558422453-576457df4b0d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center fixed;
  background-size: cover;
`;

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px; /* Increased width for additional styling */
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: black; /* Text color set to black */
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

const RegisterLink = styled.span`
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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        if (data.isAdmin) {
          // Redirect admin to admin page
          window.location.href = '/dashboard'; // Change the URL to your admin page
        } else {
          // Redirect normal user to homepage
          window.location.href = '/'; // Change the URL to your homepage
        }
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  

  return (
    <LoginPageContainer>
      <LoginForm>
        <h2 style={{ color: '#333' }}>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" onClick={handleLogin}>
          Login
        </Button>
        <RegisterLink>
          Don't have an account? <a href="/register">Register</a>
        </RegisterLink>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Login;
