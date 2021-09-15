import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Error = ({ error }) => {
  const location = useLocation();

  return (
    <Wrapper>
      {location.state.error ? (
        <p>{location.state.error}</p>
      ) : (
        <p>{String(error)}</p>
      )}
      <StyledLink to="/">home</StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  min-width: 80px;
  height: 45px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: #2f49d1;
  text-align: center;
  font-size: 14px;
  line-height: 45px;
  color: #fff;
  vertical-align: middle;
`;

export default Error;
