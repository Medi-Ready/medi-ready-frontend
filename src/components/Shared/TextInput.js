import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const TextInput = ({ label, width, placeholder }) => {
  return (
    <label htmlFor={label} >
      <Input type="text" width={width} placeholder={placeholder} />
    </label>
  );
};

const Input = styled.input`
  display: inline-block;
  width: ${(props) => props.width};
  height: 45px;
  padding: 0 10px;
  background-color: #EFF0F6;
  border-radius: 8px;
  box-sizing: border-box;
  line-height: 45px;
`;

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  width: "100%",
};

export default TextInput;
