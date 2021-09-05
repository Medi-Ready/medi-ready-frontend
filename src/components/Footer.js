import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>2021 © Medi-Ready - medi-ready.com</StyledFooter>
  );
};

const StyledFooter = styled.footer`
  padding: 23px;
  border-top: 1px solid #E0E1EA;
  font-size: 13px;
  color: #B9B9B9;
`;

export default Footer;
