import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiUsers, FiBox, FiHome, FiLogOut } from 'react-icons/fi'; // Import Feather icons
import { Link } from 'react-router-dom'; // Import Link for navigation

const palette = {
  purple: '#301E67',
  peach: '#FFB647',
  yellow: '#FAD400',
  grey: '#EDEDED',
  black: '#1D1D1D'
};

const DashboardContainer = styled.div`
  background: linear-gradient(to right, ${palette.purple}, ${palette.peach});
  display: flex;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 2rem;
  min-height: 100vh;
  background: ${palette.purple};
`;

const Content = styled.div`
  background: ${palette.grey};
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  flex: 5;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
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
  color: ${palette.grey};
  text-decoration: none;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${palette.purple};
    color: #fff;
  }
`;

const Icon = styled.span`
  margin-right: 1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${palette.purple};
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  font-size: 1.2rem;
  color: ${palette.black};
`;

const LogoutButton = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${palette.purple};
    color: #fff;
  }
`;

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [productStats, setProductStats] = useState(null);

  useEffect(() => {
    fetchUserStatistics();
    fetchProductStatistics();
  }, []);

  const fetchUserStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/total');
      if (!response.ok) {
        throw new Error('Failed to fetch user statistics');
      }
      const data = await response.json();
      setUserStats(data.totalUsers);
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      setUserStats();
    }
  };

  const fetchProductStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product/total');
      if (!response.ok) {
        throw new Error('Failed to fetch product statistics');
      }
      const data = await response.json();
      if (typeof data.count === 'number') {
        setProductStats(data.count);
      } else {
        throw new Error('Product count is not a number');
      }
    } catch (error) {
      console.error('Error fetching product statistics:', error);
      setProductStats();
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Title>Admin Dashboard</Title>
        <OptionLink to="/dashboard">
          <Icon><FiHome /></Icon>
          Home
        </OptionLink>
        <OptionLink to="/user-management">
          <Icon><FiUsers /></Icon>
          Manage Users
        </OptionLink>
        <OptionLink to="/product-management">
          <Icon><FiBox /></Icon>
          Manage Product
        </OptionLink>
        <LogoutButton to="/login">
          <Icon><FiLogOut /></Icon>
          Logout
        </LogoutButton>
      </Sidebar>
      <Content>
        <div>
          <h1>Welcome, Admin!</h1>
          <p>Select an option from the sidebar to manage users or products.</p>
          <Card>
            <CardTitle>User Statistics</CardTitle>
            <CardContent>Total Users: <span style={{ color: palette.black }}>{userStats !== null ? userStats : 'Loading...'}</span></CardContent>
          </Card>
          <Card>
            <CardTitle>Product Statistics</CardTitle>
            <CardContent>Total Products: <span style={{ color: palette.black }}>{productStats !== null ? productStats : 'Loading...'}</span></CardContent>
          </Card>
        </div>
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
