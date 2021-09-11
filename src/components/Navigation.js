import React from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";

import { postLogout } from "../api";

const Navigation = ({ isLoggedIn, onLogout }) => {
  const history = useHistory();

  const handleLogout = async (event) => {
    event.preventDefault();

    const { result } = await postLogout();

    if (result === "success") {
      onLogout("");
      history.push("/login");
    }
  };
  const OFFSET = 0;
  const LIMIT = 3;

  return (
    <Wrapper>
      <Logo><Link to="/">MEDI-READY</Link></Logo>

      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/prescription">Prescription</Link>
          </li>
          <li>
            <Link to={`/prescriptions?offset=${OFFSET}?limit=${LIMIT}`}>History</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 230px;
  padding: ${({ theme }) => theme.padding.default};
  background-color: ${({ theme }) => theme.color.blue};
  box-sizing: border-box;

  nav {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #1771f8;
    font-weight: 400;
    letter-spacing: 0.04em;

    * {
      color: ${({ theme }) => theme.color.white}
    };

    li {
      padding: 10px 0;
      font-size: 15px;
    }
  }
`;

const Logo = styled.h1`
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
`;

export default Navigation;
