import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <text>
        돼지고기(국내산) 쌀(국내산) 배추김치(배추-국내산 고춧가루-국내산,중국산)
        두부(콩-국내산)
      </text>
      <ButtonContainer to="/admin">
        <Link to="/admin">관리자</Link>
      </ButtonContainer>
    </div>
  );
};

export default Footer;

const ButtonContainer = styled.button`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;
