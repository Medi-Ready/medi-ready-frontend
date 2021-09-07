import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  return (
    <StyledNavigation>
      <h1 className="logo"><Link to="/">MEDI-READY</Link></h1>

      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/prescription">Prescription</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.nav`
  width: 230px;
  padding: ${({ theme }) => theme.padding.default};
  background-color: ${({ theme }) => theme.color.blue};
  box-sizing: border-box;

  .logo a {
    display: block;
    width: 100%;
    height: 50px;
    padding-left: 60px;
    background: url("./logo.png") no-repeat;
    color: ${({ theme }) => theme.color.white};
    font-weight: 600;
    line-height: 50px;
    letter-spacing: 0.03em;
    box-sizing: border-box;
  }

  nav {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #1771f8;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  nav li {
    padding: 10px 0;
    font-size: 15px;
  }

  nav * {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default Navigation;
