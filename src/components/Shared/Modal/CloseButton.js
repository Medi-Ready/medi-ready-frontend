import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

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

const CloseButton = (props) => {
  const {
    text,
    color,
    closeModal
  } = props;

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