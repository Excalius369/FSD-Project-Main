import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background: #1a1a2e; /* Dark blue background color */
  color: #fff;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748; /* Dark blue-gray text */
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #262b3e; /* Darker background color */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow-x: auto;
  max-width: 100%;
`;

const Th = styled.th`
  padding: 1rem;
  background: #4a90e2; /* Blue background */
  font-weight: 700;
  color: #fff; /* White text */
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #666666; /* Lighter border color */
  font-weight: 500;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #fcbf49; /* Yellow background */
  color: #2d3748; /* Dark blue-gray text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f3b707; /* Darker yellow on hover */
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e53e3e; /* Red background */
  color: #fff; /* White text */
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
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
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
        <PageTitle>Manage User</PageTitle>
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
      <ToastContainer />
    </DashboardContainer>
  );
};

export default UserManagement;
