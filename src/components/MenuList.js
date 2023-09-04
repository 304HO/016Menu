import React from "react";
import styled from "styled-components";

const MenuList = ({ menus }) => {
  // 쉼표를 사용하여 번호 형식 지정
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <MenuListContainer>
      {menus.map((menu) => (
        <MenuItem key={menu.menuName}>
          <MenuImage src={menu.photo} alt={menu.menuName} />
          <h3>{menu.menuName}</h3>
          <p>{menu.description}</p>
          <p>가격: {formatNumberWithCommas(menu.price)}원</p>
        </MenuItem>
      ))}
    </MenuListContainer>
  );
};

export default MenuList;

const MenuImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 20px;
`;

const MenuItem = styled.div`
  width: 270px;
  color: white;
  background-color: rgba(59, 64, 77, 0.6);
  border: 10px solid transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 20px;
  gap: 20px;
`;
