import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.direction === 'left' ? '10px' : 'unset')};
  right: ${props => (props.direction === 'right' ? '10px' : 'unset')};
  margin: auto;
  cursor: pointer;
  z-index: 2;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease;
  z-index: 1;
`;

const Slide = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const ShowNowButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 15px 30px;
  font-size: 20px;
  background-color: #000000; /* Changed button background color */
  color: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #555; /* Changed button background color on hover */
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 5;
  const navigate = useNavigate();

  const handleArrowClick = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : totalSlides - 1);
    } else {
      setSlideIndex(slideIndex < totalSlides - 1 ? slideIndex + 1 : 0);
    }
  };

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex(current => (current === totalSlides - 1 ? 0 : current + 1));
  };

  const redirectToProductPage = () => {
    navigate('/footwears');
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleArrowClick('left')}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper style={{ transform: `translateX(-${slideIndex * 100}vw)` }}>
      <Slide>
          <ImgContainer>
            <Image
              src="https://www.superkicks.in/cdn/shop/files/GEL-1130.png?v=1708327030"
              alt="Slide 1"
            />
            <ShowNowButton onClick={redirectToProductPage}>SHOP NOW</ShowNowButton>
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src="https://www.superkicks.in/cdn/shop/files/AIR_FORCE_1_MID_EVO_01_a3ea0d04-345a-4f69-aae9-c875a4d03e1a.png?v=1704264667"
              alt="Slide 2"
            />
            <ShowNowButton onClick={redirectToProductPage}>SHOP NOW</ShowNowButton>
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src="https://www.superkicks.in/cdn/shop/files/RIGHT_BANNER_TOP_LAST_01_1.png?v=1704264549"
              alt="Slide 3"
            />
            <ShowNowButton onClick={redirectToProductPage}>SHOP NOW</ShowNowButton>
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src="https://www.superkicks.in/cdn/shop/files/LIL_NAS_X_CROCS_-LEFT_4892c0f3-3a97-40b9-8add-3f278447e6d0.png?v=1703780220"
              alt="Slide 4"
            />
            <ShowNowButton onClick={redirectToProductPage}>SHOP NOW</ShowNowButton>
          </ImgContainer>
        </Slide>
        <Slide>
          <ImgContainer>
            <Image
              src="https://www.superkicks.in/cdn/shop/files/AIR_JORDAN_6_RETRO.jpg?v=1707399240"
              alt="Slide 5"
            />
            <ShowNowButton onClick={redirectToProductPage}>SHOP NOW</ShowNowButton>
          </ImgContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right" onClick={() => handleArrowClick('right')}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
