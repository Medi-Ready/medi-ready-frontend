import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const TextInput = ({ label, width, name, placeholder, value, disabled }) => {
  return (
    <label htmlFor={label} >
      <Input type="text"
        id={label}
        width={width}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
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
  width: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  width: "100%",
};

export default TextInput;
