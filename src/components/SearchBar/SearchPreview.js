import React from "react";
import styled from "styled-components";

const SearchPreview = ({ id, name, count, updateText, index }) => {
  const medicineName = name.length > 15 ? name.substring(0, 15) + "..." : name;

  return (
    <PreviewWrapper onClick={() => updateText(name)} id={id} index={index}>
      <div className="first">
        <p className="name">{medicineName}</p>
      </div>
      <div className="second">
        <p className="count">{count}</p>
        <p className="sub-header">frequency</p>
      </div>
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.div`
  transition: 0.1s;
  top: ${(props) => props.index * 20 + "px"};
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-right: 10px;
  border-color: rgb(241, 241, 241);
  align-items: center;
  border-radius: 5px;

  :hover {
    background-color: #f3f3f3;
  }

  .first {
    display: flex;
    height: 100%;
    align-items: center;
    color: #797979;
    font-size: 14px;
  }

  .second {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  .sub-header {
    font-weight: 600;
    font-size: 10px;
    color: #797979;
  }
`;

SearchPreview.defaultProps = {
  count: 1,
};

export default SearchPreview;
