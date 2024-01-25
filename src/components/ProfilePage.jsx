import React from 'react';
import styled from 'styled-components';

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

const ProfilePage = () => {
  // Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street, City, Country',
    // Add more user details as needed
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
        {/* Add more user details as needed */}
      </ProfileDetails>
    </ProfileContainer>
  );
};

export default ProfilePage;