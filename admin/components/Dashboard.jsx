// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductManagement from './ProductManagement'; // Import the ProductManagement component

// Styled components with visually polished styles
const DashboardContainer = styled.div`
  display: flex;
  background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);
`;

const Sidebar = styled.div`
  flex: 1;
  background: #333; 
  padding: 2rem;
  min-height: 100vh; /* Adjusted to fill entire viewport height */
`;

const Content = styled.div`
  flex: 5;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const OptionLink = styled.a`
  display: block;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: #fff;
  } 
`;

// Icon components
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
);

const ProductIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/></svg>  
);

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Use state to track the current page
  const [userStats, setUserStats] = useState(0); // State to store total number of users
  const [productStats, setProductStats] = useState(0); // State to store total number of products

  // Fetch user statistics and product statistics
  useEffect(() => {
    fetchUserStatistics();
    fetchProductStatistics();
  }, []);

  const fetchUserStatistics = async () => {
    try {
      // Fetch user statistics from your backend API
      // Example: const response = await fetch('your-backend-api-url/users/stats');
      // Example: const data = await response.json();
      // Example: setUserStats(data.totalUsers);
    } catch (error) {
      console.error('Error fetching user statistics:', error);
    }
  };

  const fetchProductStatistics = async () => {
    try {
      // Fetch product statistics from your backend API
      // Example: const response = await fetch('your-backend-api-url/products/stats');
      // Example: const data = await response.json();
      // Example: setProductStats(data.totalProducts);
    } catch (error) {
      console.error('Error fetching product statistics:', error);
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Title>
          <OptionLink href="#" onClick={() => setCurrentPage('dashboard')}>
            Admin Dashboard
          </OptionLink>
        </Title>
      
        <OptionLink href="#user-management">
          <UserIcon />
          User Management
        </OptionLink>
        
        <OptionLink href="#product-management" onClick={() => setCurrentPage('product-management')}>
          <ProductIcon />          
          Product Management 
        </OptionLink>
        
      </Sidebar>
      
      <Content>
        {currentPage === 'dashboard' && (
          <div>
            <h1>Welcome, Admin!</h1>
            <p>Select an option from the sidebar to manage users or products.</p>
            <div>User Statistics: {userStats}</div>
            <div>Product Statistics: {productStats}</div>
          </div>
        )}
        {currentPage === 'product-management' && <ProductManagement />} {/* Render the ProductManagement component when currentPage is 'product-management' */}
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
