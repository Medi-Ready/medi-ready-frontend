import styled from "styled-components";
import { useQuery } from "react-query";
import React, { useContext, useState } from "react";

import { getPrescriptions } from "../api";
import HistoryListItem from "./Shared/HistoryListItem";
import { ModalContext } from "../contexts/ModalContext";

const History = () => {
  const { handleModal } = useContext(ModalContext);
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["prescriptions", {page}], getPrescriptions);

  const ViewDetail = () => {
    handleModal("디테일 내용");
  };

  const info = {
    name: "Ken",
    status: "medi-ready medi-ready medi-ready medi-ready",
    date: "1993-05-28",
  };

  return (
    <>
      <h2>Prescription History</h2>

      <Wrapper>
        <ul>
          <li className="index">
            <b>Name</b>
            <span>Status</span>
            <span>Date</span>
          </li>
        </ul>
        <ul>
          <HistoryListItem data={info} openModal={ViewDetail} />
          <HistoryListItem data={info} openModal={ViewDetail} />
          <HistoryListItem data={info} openModal={ViewDetail} />
          <HistoryListItem data={info} openModal={ViewDetail} />
          <HistoryListItem data={info} openModal={ViewDetail} />
          <HistoryListItem data={info} openModal={ViewDetail} />
          <HistoryListItem data={info} openModal={ViewDetail} />
        </ul>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  padding: ${({ theme }) => theme.padding.default};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

  ul {
    padding-top: 5px;
  }

  ul:first-child {
    border-bottom: 1px solid #e9e9e9;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 15px;
    height: 50px;
  }

  li.index b {
    width: 20%;
    font-size: 16px;
    color: #767676;
  }

  li.index span {
    color: #767676;
    font-size: 16px;
  }

  li span:nth-child(2) {
    width: 50%;
  }

  li span:nth-child(3) {
    width: 15%;
  }

  li:not(.index):hover {
    cursor: pointer;
  }
`;

export default History;
