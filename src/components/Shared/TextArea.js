import React from "react";

import styled from "styled-components";

const TextArea = ({ name, children, onChange }) => {
  return <Wrapper name={name} onChange={onChange}>{children}</Wrapper>;
};

const Wrapper = styled.textarea`
  min-height: 100px;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 8px;
  background-color: #EFF0F6;
  outline: none;
  overflow: auto;
  box-shadow: none;
  resize: none;
`;

export default TextArea;
