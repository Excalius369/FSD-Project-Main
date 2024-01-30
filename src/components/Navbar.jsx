import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCartOutlined,
  Menu,
  AccountCircle,
  LocalMall,
  NewReleases,
  LocalOffer,
} from '@mui/icons-material';
import { Badge, MenuItem } from '@mui/material';

const Container = styled.div`
  height: 60px;
  background: linear-gradient(to right, #001f3f, #0d3f67);
  color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchContainer = styled.div`
  border: 0.5px solid #f2f2f2;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Input = styled.input`
  border: none;
  margin-left: 5px;
  outline: none;
  color: white;
  background-color: transparent;
  width: 150px;
  transition: background-color 0.3s ease, width 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    width: 200px;
  }

  &::placeholder {
    color: #f2f2f2;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lobster', cursive;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  left: -10px;
  background-color: #ffffff;
  border: 1px solid #ffd700;
  border-radius: 20px; /* Rounded corners */
  padding: 10px;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  z-index: 3;
  animation: ${(props) => (props.$show ? fadeIn : fadeOut)} 0.3s ease;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  color: #001f3f;
  text-decoration: none;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s forwards;

  &:hover {
    background-color: #ffd700;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const StyledButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const RegisterButton = styled(StyledButton)`
  background-color: #ffd700;
  color: #001f3f;
  margin-right: 10px;
`;

const LoginButton = styled(StyledButton)`
  background-color: #ffd700;
  color: #001f3f;
  margin-right: 10px;
`;

const CartLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    color: white;
  }
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDropdownItemClick = () => {
    setShowMenu(false); // Close the dropdown when a dropdown item is clicked
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Menu
            style={{ color: 'white', fontSize: 30, cursor: 'pointer' }}
            onClick={toggleMenu}
          />
          <SearchContainer>
            <Search style={{ color: 'gray', fontSize: 16 }} />
            <Input placeholder="Search" />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1 style={{ fontFamily: 'Lobster', margin: 0, fontWeight: 'normal' }}>SoleRush</h1>
          </Link>
        </Center>
        <Right>
          <RegisterButton to="/register">Register</RegisterButton>
          <LoginButton to="/login">Login</LoginButton>
          <CartLink to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined style={{ color: 'white' }} /> {/* Change color to white */}
              </Badge>
            </MenuItem>
          </CartLink>
        </Right>
      </Wrapper>
      <Dropdown $show={showMenu}>
        <DropdownItem to="/profile" onClick={handleDropdownItemClick}>
          <IconWrapper>
            <AccountCircle />
          </IconWrapper>
          Profile
        </DropdownItem>
        <DropdownItem to="/sneakercare" onClick={handleDropdownItemClick}>
          <IconWrapper>
            <LocalMall />
          </IconWrapper>
          Sneaker Care
        </DropdownItem>
        <DropdownItem to="/footwears" onClick={handleDropdownItemClick}>
          <IconWrapper>
            <LocalOffer />
          </IconWrapper>
          Footwears
        </DropdownItem>
       
      </Dropdown>
    </Container>
  );
};

export default Navbar;
