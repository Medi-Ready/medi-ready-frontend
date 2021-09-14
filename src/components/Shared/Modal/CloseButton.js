import React, { useContext } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const CloseButton = ({ text, color, closeModal }) => {
  return (
    <Button
      type="button"
      aria-label="닫기"
      color={color}
      onClick={closeModal}
    >
      {text}
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: ${props => props.color};
  border: none;
  color: ${({ theme }) => theme.color.white};
`;

CloseButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  text: "Close",
  color: "",
};

export default CloseButton;
