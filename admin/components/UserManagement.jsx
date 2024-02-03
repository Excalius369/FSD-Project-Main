import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar'; // Import Sidebar component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 1px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: #f5f5f5; /* Updated background color */
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #3b3b3b;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff; /* Updated background color */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 1rem;
  background: #755cde;
  font-weight: 500;
  color: #fff;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-weight: 400;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const DeleteButton = styled(Button)`
  border-radius: 20px;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'DELETE',
      });
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId)); // Update state after successful deletion
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <PageTitle>User Management</PageTitle> {/* Added page title */}
        <Table>
          <thead>
            <tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <DeleteButton onClick={() => handleDeleteUser(user._id)}>Delete</DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
      <ToastContainer /> {/* Add ToastContainer here */}
    </DashboardContainer>
  );
};

export default UserManagement;
