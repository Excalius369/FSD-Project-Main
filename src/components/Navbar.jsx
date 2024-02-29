import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, ShoppingCartOutlined, Menu, AccountCircle, LocalMall, LocalOffer } from '@mui/icons-material';
import { Badge, MenuItem } from '@mui/material';
import axios from 'axios';

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

// const SearchContainer = styled.div`
//   position: relative;
//   border: 0.5px solid #f2f2f2;
//   display: flex;
//   align-items: center;
//   margin-left: 20px;
//   padding: 5px;
//   border-radius: 20px;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }

//   @media (max-width: 768px) {
//     margin-left: 0;
//     margin-top: 10px;
//   }
// `;

// const Input = styled.input`
//   border: none;
//   margin-left: 5px;
//   outline: none;
//   color: white;
//   background-color: transparent;
//   width: 150px;
//   transition: background-color 0.3s ease, width 0.3s ease;

//   &:focus {
//     background-color: rgba(255, 255, 255, 0.2);
//     width: 200px;
//   }

//   &::placeholder {
//     color: #f2f2f2;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

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
  left: 20px; /* Change from 'right' to 'left' */
  background-color: #ffffff;
  border: 1px solid #ffd700;
  border-radius: 10px;
  padding: 10px;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  z-index: 1000;
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

const SearchContainer = styled.div`
  position: relative;
  border: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
  border-radius: 30px; /* Increased border radius for a more rounded look */
  transition: all 0.3s ease;
  width: 300px; /* Increased width */

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%; /* Adjusted width for smaller screens */
  }
`;

const Input = styled.input`
  border: none;
  margin-left: 10px; /* Increased margin */
  outline: none;
  color: white;
  background-color: transparent;
  flex: 1; /* Allow input to grow and fill the available space */
  transition: background-color 0.3s ease, width 0.3s ease;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    width: 100%; /* Expand input width when focused */
  }

  &::placeholder {
    color: #f2f2f2;
  }
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%); /* Center the container horizontally */
  width: 320px; /* Increased width */
  background-color: #fff;
  border-radius: 20px;
  padding: 15px; /* Increased padding */
  z-index: 999;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling */
`;

const SearchResultItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchResultImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 10px;
  object-fit: cover;
`;

const SearchResultInfo = styled.div`
  flex: 1;
`;

const SearchResultTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;


const SearchResultPrice = styled.p`
  margin: 5px 0 0 0;
  font-size: 16px;
  font-weight: bold;
`;



const SearchResultBrand = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: #888;
`;


const SearchResultAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedSearchResultItem = styled(SearchResultItem)`
  animation: ${SearchResultAnimation} 0.3s ease forwards;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);  
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/products?search=${searchQuery}`);
        setSearchResults(response.data);
        setIsSearching(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDropdownItemClick = () => {
    setShowMenu(false);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {!isLoggedIn && (
            <LoginButton to="/login">
              Login
            </LoginButton>
          )}
          {isLoggedIn && (
            <>
              <Menu style={{ color: 'white', fontSize: 30, cursor: 'pointer' }} onClick={toggleMenu} />
              <SearchContainer ref={inputRef}>
                <Search style={{ color: 'gray', fontSize: 16 }} />
                <Input 
                  placeholder="Search" 
                  value={searchQuery} 
                  onChange={handleSearchInputChange} 
                />
                {isSearching && (
        <SearchResultsContainer>
          {searchResults.map(product => (
            <AnimatedSearchResultItem key={product._id} to={`/product/${product._id}`}>
              <SearchResultImage src={product.img} alt={product.name} />
              <SearchResultInfo>
                <SearchResultTitle>{product.name}</SearchResultTitle>
                <SearchResultBrand>{product.brandName}</SearchResultBrand>
                <SearchResultPrice>Price: {product.price}</SearchResultPrice>
              </SearchResultInfo>
            </AnimatedSearchResultItem>
          ))}
        </SearchResultsContainer>
      )}
              </SearchContainer>
            </>
          )}
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1 style={{ fontFamily: 'Lobster', margin: 0, fontWeight: 'normal' }}>SoleRush</h1>
          </Link>
        </Center>
        <Right>
          {isLoggedIn && (
            <>
              <CartLink to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined style={{ color: 'white' }} />
                  </Badge>
                </MenuItem>
              </CartLink>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
                <IconWrapper>
                  <AccountCircle style={{ color: 'white', fontSize: 24, cursor: 'pointer' }} />
                </IconWrapper>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
      {isLoggedIn && (
        <Dropdown $show={showMenu}>
          <DropdownItem to="/footwears" onClick={handleDropdownItemClick}>
            <IconWrapper>
              <LocalMall style={{ color: '#001f3f', fontSize: 20, marginRight: 10 }} />
            </IconWrapper>
            Footwear
          </DropdownItem>
          <DropdownItem to="/sneakercare" onClick={handleDropdownItemClick}>
            <IconWrapper>
              <LocalOffer style={{ color: '#001f3f', fontSize: 20, marginRight: 10 }} />
            </IconWrapper>
            Sneaker Care
          </DropdownItem>
          <DropdownItem to="/orderspage" onClick={handleDropdownItemClick}>
            <IconWrapper>
              <LocalMall style={{ color: '#001f3f', fontSize: 20, marginRight: 10 }} />
            </IconWrapper>
            Orders
          </DropdownItem>
        </Dropdown>
      )}
    </Container>
  );
};

export default Navbar;
