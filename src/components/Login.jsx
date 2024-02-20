import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setAdmin } from '../redux/store'; // Import the setAdmin action
import V2Gif from '../components/asset/V2.gif';

const MySwal = withReactContent(Swal);
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
  background: url(${V2Gif}) no-repeat center center fixed;
  background-size: cover;
`;

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px;
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
  color: black;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        sessionStorage.setItem('userId', data.userId);

        dispatch(setLoggedIn(true));

        if (data.isAdmin) {
          dispatch(setAdmin(true));
          navigate('/dashboard');
          MySwal.fire({
            icon: 'success',
            title: 'Welcome Admin!',
            html: `
              <p style="font-size: 18px; color: #fff;">You've successfully logged in as an admin.</p>
              <p style="font-size: 16px; color: #fff;">Redirecting to admin dashboard...</p>
            `,
            showConfirmButton: false,
            timer: 3000,
            background: 'linear-gradient(to right, #192a56, #273c75)',
            customClass: {
              title: 'custom-title',
              container: 'custom-container',
              popup: 'custom-popup',
            },
          });
        } else {
          navigate('/');
          MySwal.fire({
            icon: 'success',
            title: 'Login Successful!',
            html: `
              <p style="font-size: 18px; color: #fff;">Welcome back, ${username}!</p>
              <p style="font-size: 16px; color: #fff;">Redirecting to homepage...</p>
            `,
            showConfirmButton: false,
            timer: 3000,
            background: 'linear-gradient(to right, #192a56, #273c75)',
            customClass: {
              title: 'custom-title',
              container: 'custom-container',
              popup: 'custom-popup',
            },
          });
        }
      } else {
        console.error('Login failed:', data.message);

        MySwal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'Invalid username or password.',
          background: 'linear-gradient(to right, #192a56, #273c75)',
          customClass: {
            title: 'custom-title',
            container: 'custom-container',
            popup: 'custom-popup',
          },
        });
      }
    } catch (error) {
      console.error('Error during login:', error);

      MySwal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: 'Failed to connect to the server. Please try again later.',
        background: 'linear-gradient(to right, #192a56, #273c75)',
        customClass: {
          title: 'custom-title',
          container: 'custom-container',
          popup: 'custom-popup',
        },
      });
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
