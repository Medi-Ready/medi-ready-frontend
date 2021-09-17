import React, { useContext } from "react";

import { ModalContext } from "../../../contexts/ModalContext";

const ConfirmMessage = ({ text }) => {
  const { handleModal } = useContext(ModalContext);

  setTimeout(() => handleModal(null), 1000000);

  return (
    <p>{text}</p>
  );
};

export default ConfirmMessage;
