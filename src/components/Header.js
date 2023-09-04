import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Title />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const Title = styled.div`
  width: 100%;
  height: 100px;
  background-image: url("https://304HO.github.io/016Menu/logo.PNG");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
