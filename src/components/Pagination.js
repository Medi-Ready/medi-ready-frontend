import React from "react";
import styled from "styled-components";

import FlexBox from "./Shared/FlexBox";

const Pagination = ({ page, setPage, hasMore, isPreviousData }) => {
  return (
    <StyledFlexBox>
      <StyledButton onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
        prev
      </StyledButton>

      <span>{page + 1}</span>

      <StyledButton
        onClick={() => {
          if (!isPreviousData && hasMore) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPreviousData || !hasMore}
      >
        next
      </StyledButton>
    </StyledFlexBox>
  );
};

const StyledFlexBox = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  margin-top: 25px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    font-size: 23px;
    margin: 0 15px;
  }

  .disabled {
    background-color: #e1e1e1;
  }
`;

const StyledButton = styled.button`
  margin: 0;
  min-width: 20px;
  padding: 8px 10px;
  width: 60px;
  color: #fff;
  font-size: 16px;
  background-color: #2f49d1;
  border-radius: 4px;
`;

export default Pagination;