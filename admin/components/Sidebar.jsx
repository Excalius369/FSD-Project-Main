import React from 'react';
import styled from 'styled-components';
import { FiUsers, FiBox, FiHome, FiLogOut } from 'react-icons/fi'; // Import Feather icons
import { Link } from 'react-router-dom'; // Import Link for navigation

const palette = {
  purple: '#5E548E',
  green: '#9BC400',
  peach: '#FFB07C',
  yellow: '#FFD878',
  grey: '#F7F7F7',
  black: '#000'
};

const SidebarContainer = styled.div`
  flex: 1;
  padding: 2rem ; /* Adjusted padding */
  min-height: 100vh;
  background: ${palette.purple};
  max-width: 300px; /* Adjust the width as needed */
  padding-top: 0; /* Removed top padding */
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${palette.yellow};
  margin-bottom: 1rem;
`;

const OptionLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #fff;
  }
`;

const Icon = styled.span`
  margin-right: 1rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-top: 1rem;
  
  &:hover {
    color: #fff;
  }
`;

const Sidebar = () => {
  const handleLogout = () => {
    // Perform logout logic here
    console.log('Logging out...');
  };

  return (
    <SidebarContainer>
      <Title>Admin Dashboard</Title>
      <OptionLink to="/dashboard">
        <Icon><FiHome /></Icon>
        Home
      </OptionLink>
      <OptionLink to="/user-management">
        <Icon><FiUsers /></Icon>
        Manage User
      </OptionLink>
      <OptionLink to="/product-management">
        <Icon><FiBox /></Icon>          
        Manage Product
      </OptionLink>
      <LogoutButton onClick={handleLogout}>
        <Icon><FiLogOut /></Icon>
        Logout
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;