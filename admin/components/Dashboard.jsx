import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiUsers, FiBox, FiHome, FiLogOut } from 'react-icons/fi'; // Import Feather icons
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { useDispatch } from 'react-redux'; // Import useDispatch for Redux
import { setLoggedOut } from '../../src/redux/store';


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

const LogoutButton = styled.button`
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

const Dashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [productStats, setProductStats] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const userResponse = await fetch('http://localhost:3000/api/users/total');
      const productResponse = await fetch('http://localhost:3000/api/products/total');

      if (!userResponse.ok || !productResponse.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const userData = await userResponse.json();
      const productData = await productResponse.json();

      setUserStats(userData.totalUsers);
      setProductStats(productData.totalProducts);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setUserStats('Error');
      setProductStats('Error');
    }
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Dispatch the action to set the user as logged out
    dispatch(setLoggedOut());
    // Redirect to the login page and replace the current entry in the history stack
    window.location.replace('/login');
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
        <LogoutButton onClick={handleLogout}>
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

export default Dashboard;
