import React from "react";
import styled from "styled-components";

const HeaderMenu = ({ onMenuTypeChange }) => {
  const handleMenuClick = (menuType) => {
    onMenuTypeChange(menuType);
  };

  return (
    <Container>
      <StyledText onClick={() => handleMenuClick("menu")}>메뉴</StyledText>
      <StyledText onClick={() => handleMenuClick("sideMenu")}>
        사이드 메뉴
      </StyledText>
      <StyledText onClick={() => handleMenuClick("drinkMenu")}>
        음료, 주류
      </StyledText>
    </Container>
  );
};

export default HeaderMenu;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const StyledText = styled.span`
  font-size: 16px;
  color: white;
  cursor: pointer;
`;
