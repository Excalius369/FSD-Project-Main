// Announcement.jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  background-color: #001F3F; /* Deep Blue */
  color: #FFD700; /* Gold */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const AnnouncementText = styled.span`
  display: flex;
  align-items: center;
  padding-left: 10px;
  &:before,
  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #FFD700; /* Gold */
    margin: 0 10px;
  }
`;

const Announcement = () => {
  return (
    <Container>
      <AnnouncementText>
        🌟 Super Deal! Free Shipping on Orders Over $50 🌟
      </AnnouncementText>
    </Container>
  );
};

export default Announcement;
