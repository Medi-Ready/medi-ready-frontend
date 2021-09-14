import React, { useContext } from "react";

import styled from "styled-components";

import Button from "../Button";
import CloseButton from "./CloseButton";
import { ModalContext } from "../../../contexts/ModalContext";

const ConfirmModal = ({ setIsSubmit, setForm, message }) => {
  const { handleModal } = useContext(ModalContext);

  const handleChange = () => {
    setForm();
    setIsSubmit(true);
    handleModal(null);
  };

  return (
    <Wrapper>
      <p>{message}</p>
      <CloseButton text="취소" closeModal={() => handleModal(null)} />
      <StyledButton type="button" onClick={handleChange}>확인</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  p {
    text-align: center;;
    margin-bottom: 10px;
  }

  button {
    min-width: 80px;
    position: initial;
    color: #222;
  }
`;

const StyledButton = styled(Button)`
  color: #fff !important;
`;

export default ConfirmModal;
