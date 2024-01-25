import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 30px; /* Adjusted padding */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  animation: ${float} 4s infinite alternate;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px; /* Reduced margin */
  color: #333;
  text-align: center;
`;

const ContactForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: 100%; /* Set width to 100% for full width */

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Contact Us</Title>
        <ContactForm onSubmit={handleSubmit}>
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <TextArea placeholder="Your Message" rows="6" required />
          <SubmitButton type="submit">Submit</SubmitButton>
        </ContactForm>
      </ContentContainer>
    </Container>
  );
};

export default ContactUs;
