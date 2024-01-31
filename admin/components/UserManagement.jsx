import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar'; // Import Sidebar component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #f2f2f2;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
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
        <h1>User Management</h1>
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
