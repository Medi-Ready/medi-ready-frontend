import React, { useContext } from "react";

import { ModalContext } from "../contexts/ModalContext";

const History = () => {
  const { handleModal } = useContext(ModalContext);

  const ViewDetail = () => {
    handleModal("디테일 내용");
  };

  return (
    <>
      <h2>History</h2>

      <button onClick={ViewDetail}>HistoryDetail</button>
    </>
  );
};

export default History;
