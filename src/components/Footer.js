import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import CopyToClipboard from "react-copy-to-clipboard";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    // 1초 후에 'copied' 상태를 초기화
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <FooterContainer>
      Copyright 2023.&nbsp; <strong>304호 개발자 지망생</strong>. All rights
      reserved.&nbsp;
      <CopyToClipboard text="267291613678534657" onCopy={handleCopy}>
        <DiscordIconBox>
          <FontAwesomeIcon icon={faDiscord} size="1x" />
          {copied ? "ID 복사완료!" : "@304"}
        </DiscordIconBox>
      </CopyToClipboard>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  color: white;
  align-items: center;
`;

const DiscordIconBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
