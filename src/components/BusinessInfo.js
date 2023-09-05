import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const BusinessInfo = () => {
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  const toggleBusinessInfo = () => {
    setShowBusinessInfo(!showBusinessInfo);
  };

  return (
    <FooterContainer>
      <ButtonContainer onClick={toggleBusinessInfo}>
        <FontAwesomeIcon icon={faChevronDown} /> 사업자 정보
      </ButtonContainer>
      {showBusinessInfo && (
        <BusinessInfoContent>
          대표자 | 홍명규
          <br />
          주소 | 경북 포항시 북구 두호로6번길 7
          <br />
          이메일 | hmgk11@naver.com
          <br />
          사업자등록번호 | 1305600875
        </BusinessInfoContent>
      )}
    </FooterContainer>
  );
};

export default BusinessInfo;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

const BusinessInfoContent = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  text-align: start;
`;
