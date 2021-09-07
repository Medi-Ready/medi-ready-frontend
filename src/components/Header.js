import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <span className="text">Welcome, 유저이름</span>
        <span className="img">
          <img
            alt="유저이름"
            src="https://avatars.githubusercontent.com/u/60248910?v=4"
          />
        </span>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  height: 55px;
  align-items: center;
  background-color: ${({ theme }) => theme.color.white};

  div {
    display: flex;
    margin-left: auto;
    align-items: center;
  }

  .text {
    margin-right: 10px;
  }

  .img {
    width: 40px;
    height: 40px;
  }
`;

export default Header;
