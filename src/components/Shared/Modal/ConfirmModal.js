import React, { useContext } from "react";

// import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../Button";
import CloseButton from "./CloseButton";
import { ModalContext } from "../../../contexts/ModalContext";

const ConfirmModal = ({ setIsPrescriptionSubmit }) => {
  const { handleModal } = useContext(ModalContext);

  const handleSubmit = () => {
    setIsPrescriptionSubmit(true);
    handleModal(null);
  };

  return (
    <Wrapper>
      <CloseButton closeModal={() => handleModal(null)}>취소</CloseButton>
      <Button type="button" onClick={handleSubmit}>확인</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`

`;

export default ConfirmModal;
