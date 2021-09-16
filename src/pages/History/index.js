import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { getPrescriptions } from "../../api";
import { ModalContext } from "../../contexts/ModalContext";

import Detail from "./Detail";
import HistoryListItem from "./ListItem";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import Pagination from "../../components/Shared/Pagination";
import { PageTitle, PageContent } from "../../components/Base";

const History = ({ queryClient }) => {
  const { handleModal } = useContext(ModalContext);
  const [page, setPage] = useState(0);

  const { data, error, isPreviousData, isFetching, isStale, isError } = useQuery(["prescriptions", page],
    () => getPrescriptions(page), { keepPreviousData: true, staleTime: 5 * 1000 },
  );

  useEffect(() => {
    if (data?.hasMoreData && isStale) {
      queryClient.prefetchQuery(["prescriptions", page + 1], () => getPrescriptions(page + 1));
    }
  }, [data, page, queryClient]);

  const ViewDetail = (prescription) => {
    handleModal(<Detail prescription={prescription} />);
  };

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <PageContent>
      <PageTitle>Prescription History</PageTitle>

      <Wrapper>
        <ul>
          <li className="name-card">
            <b>Name</b>
            <span>Status</span>
            <span>Date</span>
          </li>
        </ul>
        <ul className="list-items">
          {isFetching ? (
            <Loading />
          ) : (
            data.prescriptions?.map((prescription) => {
              return (
                <HistoryListItem
                  key={prescription.prescription_id}
                  prescription={prescription}
                  openModal={() => ViewDetail(prescription)}
                />
              );
            })
          )}
        </ul>
      </Wrapper>
      <Pagination
        page={page}
        setPage={setPage}
        hasMoreData={data?.hasMoreData}
        isPreviousData={isPreviousData}
      />
    </PageContent>
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
    padding: 8px 10px;
  }

  li.name-card b {
    width: 20%;
    font-size: 16px;
    color: #767676;
  }

  li.name-card span {
    color: #767676;
    font-size: 16px;
  }

  li span:nth-child(2) {
    width: 50%;
  }

  li span:nth-child(3) {
    width: 15%;
  }

  li:not(.name-card):hover {
    cursor: pointer;
  }
`;

export default History;