import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({ text, type, className }) => {
  return (
    <DefaultButton type={type} className={className}>
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
  background-color: #2f49d1;
  vertical-align: middle;
  color: #fff;
`;

export default Button;
