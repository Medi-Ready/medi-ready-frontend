import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ type, children, onClick }) => {
  return (
    <DefaultButton type={type} onClick={onClick}>
      {children}
    </DefaultButton>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: "submit",
};

const DefaultButton = styled.button`
  display: inline-block;
  min-width: 80px;
  height: 45px;
  border-radius: 8px;
  background-color: #2F49D1;
  vertical-align: middle;
  color: #fff;
`;

export default Button;
