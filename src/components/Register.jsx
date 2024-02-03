import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import withReactContent from 'sweetalert2-react-content'; // Import SweetAlert with React content support

const MySwal = withReactContent(Swal);

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('https://media.giphy.com/media/3o7bujnKrJCz2k7pW8/giphy.gif') no-repeat center center fixed;
  background-size: cover;
`;

const RegisterForm = styled.form`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px;
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
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !createPassword || !confirmPassword) {
      MySwal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'Please fill all the required fields.',
      });
      return;
    }

    if (createPassword !== confirmPassword) {
      MySwal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'Passwords do not match.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username: name,
        email,
        password: createPassword,
      });
  
      const data = response.data;
  
      if (data.success) {
        MySwal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Redirecting to login page...',
        }).then(() => {
          navigate('/login');
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: data.message || 'Unknown error occurred.',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'Failed to connect to the server. Please try again later.',
      });
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
