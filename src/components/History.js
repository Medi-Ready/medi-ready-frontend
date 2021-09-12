import styled from "styled-components";
import { useQuery } from "react-query";
import React, { useContext, useEffect, useState } from "react";

import { getPrescriptions } from "../api";
import { ModalContext } from "../contexts/ModalContext";

import Pagination from "./Pagination";
import HistoryListItem from "./Shared/HistoryListItem";

const History = ({ queryClient }) => {
  const { handleModal } = useContext(ModalContext);

  const [page, setPage] = useState(0);
  const { data, isPreviousData, isFetching } = useQuery(["prescriptions", page],
    () => getPrescriptions(page), { keepPreviousData: true, staleTime: 2000 },
  );

  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["prescriptions", page + 1],
        () => getPrescriptions(page + 1),
      );
    }
  }, [data, page, queryClient]);

  const ViewDetail = (prescription) => {
    handleModal("디테일 내용");
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
          {isFetching ? (
            <div>loading</div>
          ) : (
            data.prescriptions.map((prescription) => {
              return (
                <HistoryListItem
                  key={prescription.prescription_id}
                  prescription={prescription}
                  openModal={() => ViewDetail(prescription)}
                />
              );
            })
          )
          }
        </ul>
      </Wrapper>
      <Pagination
        page={page}
        setPage={setPage}
        hasMore={data?.hasMore}
        isPreviousData={isPreviousData}
      />
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  min-height: 60vh;
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
