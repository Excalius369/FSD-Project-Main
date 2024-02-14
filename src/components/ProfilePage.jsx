import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedOut } from '../redux/store';

const ProfileContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Box shadow for depth */
  background-color: #f9f9f9; /* Light background color */
`;

const UserDetails = styled.p`
  margin-bottom: 10px;

  strong {
    color: #333; /* Darker text color for strong tags */
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, City, Country',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the action to set the user as logged out
    dispatch(setLoggedOut());
    // Redirect to the initial homepage
    navigate('/');
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h2 style={{ color: '#333' }}>Welcome, {user.name}!</h2>
      </ProfileHeader>
      <ProfileDetails>
        <h3 style={{ marginBottom: '15px', color: '#333' }}>Your Profile Details:</h3>
        <UserDetails><strong>Name:</strong> {user.name}</UserDetails>
        <UserDetails><strong>Email:</strong> {user.email}</UserDetails>
        <UserDetails><strong>Address:</strong> {user.address}</UserDetails>
      </ProfileDetails>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </ProfileContainer>
  );
};

export default ProfilePage;
