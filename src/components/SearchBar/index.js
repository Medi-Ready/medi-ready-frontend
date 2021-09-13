import React from "react";
import styled from "styled-components";
import SearchPreview from "./SearchPreview";

const SearchBar = ({ results, keyword, label, setValue, className }) => {
  const renderResults = results.map(({ id, name }, index) => {
    return (
      <SearchPreview
        id={id}
        key={id}
        name={name}
        index={index}
        updateValue={setValue}
      />
    );
  });

  return (
    <>
      <label htmlFor={label} />
      <AutoCompleteWrapper
        type="text"
        id={label}
        value={keyword}
        className={className}
        placeholder="Enter Medicine Name"
        onChange={(event) => setValue(event.target.value)}
      />
      {results.length > 0 && <SearchResult>{renderResults}</SearchResult>}
    </>
  );
};

const AutoCompleteWrapper = styled.input`
  display: inline-block;
  width: ${(props) => props.width};
  height: 45px;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #EFF0F6;
`;

const SearchResult = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  background-color: white;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  z-index: 99;
`;

AutoCompleteWrapper.defaultProps = {
  width: "100%",
};

export default SearchBar;
