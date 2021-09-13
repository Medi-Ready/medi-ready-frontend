import React from "react";

import styled from "styled-components";

const Badge = ({ children, color }) => {
  return <Wrapper color={color}>{children}</Wrapper>;
};

const Wrapper = styled.em`
  padding: 3px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color === "green" ? "#eefcf5" : "#fff7ea"};
  color: ${(props) => props.color === "green" ? "#4bde97" : "#ffac32"};
  font-size: 13px;
`;

export default Badge;