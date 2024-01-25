// Import necessary dependencies
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Styled components for better organization
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Futura', sans-serif;
`;

const ProductWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ImageThumbnail = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProductBrand = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
`;

const ProductModel = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ProductSize = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SizeLabel = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
`;

const SizeSelect = styled.select`
  font-size: 18px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-family: 'Avenir', sans-serif;
`;

const QuantityInput = styled.input`
  font-size: 18px;
  padding: 8px;
  width: 50px;
  text-align: center;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const QuantityButton = styled.button`
  font-size: 24px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
`;

const AddToCartButton = styled.button`
  font-size: 18px;
  font-weight: bold;
  color: #fff ;
  background-color: black;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const ProductAboutContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  font-family: 'Avenir', sans-serif;
`;

const ProductAbout = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const AboutTitleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

const PlusSign = styled.span`
  font-size: 24px;
  margin-left: auto; /* Align to right */
`;

const AboutContent = styled.div`
  display: ${props => (props.showAbout ? "block" : "none")};
  margin-top: 10px;
`;

const AboutTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const AboutList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const AboutListItem = styled.li`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const StockCount = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

const FullSizeImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

// Define the size options
const sizeOptions = [
  { value: "size-5", label: "6" },
  { value: "size-6", label: "7" },
  { value: "size-7", label: "8" },
  // Add more size options as needed...
];

const ProductPage = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({
    id: 1,
    name: 'BLAZER MID 77 VINTAGE BLACK/WHITE',
    brandname: 'NIKE',
    model: 'Blazer Mid 77 Vintage',
    price: 15000,
    images: [
      'https://www.superkicks.in/cdn/shop/products/2_c6dce12d-8d76-475d-8800-866449fb6810.jpg?v=1675958421&width=360',
      // Add more image URLs as needed...
    ],
    about: ['Comfortable fit', 'Stylish design', 'Durable material'],
    stock: 50,
  });
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  const openModal = (index) => {
    setCurrentImage(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <ProductPageContainer>
        <ProductWrapper>
          {/* Image grid */}
          <ImageGrid>
            {product.images && product.images.map((image, index) => (
              <ImageThumbnail
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                onClick={() => openModal(index)}
              />
            ))}
          </ImageGrid>

          {/* Product information */}
          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductBrand>{product.brandname}</ProductBrand>
            <ProductModel>{product.model}</ProductModel>
            <ProductPrice>&#x20B9; {product.price}</ProductPrice>
            
            {/* Size selection */}
            <ProductSize>
              <SizeLabel>Size:</SizeLabel>
              <SizeSelect
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {sizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SizeSelect>
            </ProductSize>
            
            {/* Quantity selection */}
            <QuantityContainer>
              <span>Quantity:</span>
              <QuantityButton onClick={() => handleQuantity("dec")}>−</QuantityButton>
              <QuantityInput
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <QuantityButton onClick={() => handleQuantity("inc")}>+</QuantityButton>
            </QuantityContainer>
            
            {/* Add to Cart button */}
            <AddToCartButton startIcon={<AddShoppingCartIcon />} onClick={handleClick} >Add to Cart</AddToCartButton>
            <StockCount>Stock: {product.stock} left</StockCount>
          </ProductInfo>
        </ProductWrapper>

        {/* Product about section */}
        <ProductAboutContainer>
          <AddToCartButton onClick={() => setShowAbout(!showAbout)}>
            {showAbout ? "Hide About" : "Show About"}
          </AddToCartButton>
          <ProductAbout style={{ display: showAbout ? "block" : "none" }}>
            <AboutTitle>About:</AboutTitle>
            <AboutList>
              {product.about && product.about.map((feature, index) => (
                <AboutListItem key={index}>{feature}</AboutListItem>
              ))}
            </AboutList>
          </ProductAbout>
        </ProductAboutContainer>

        {/* Full-size image modal */}
        {showModal && (
          <FullSizeImageModal onClick={closeModal}>
            <ModalImage
              src={product.images && product.images[currentImage]}
              alt={`Product ${currentImage + 1}`}
            />
          </FullSizeImageModal>
        )}
      </ProductPageContainer>
    </Container>
  );
};

export default ProductPage;
