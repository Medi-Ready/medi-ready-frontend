import React from "react";
import styled from "styled-components";
import SearchPreview from "./SearchPreview";

const SearchBar = ({ results, keyword, label, setValue, className, placeholder }) => {
  const renderResults = results.map(({ id, name }, index) => {
    return (
      <SearchPreview
        key={id}
        id={id}
        index={index}
        name={name}
        updateText={setValue}
      />
    );
  });

  return (
    <>
      <label htmlFor={label}></label>
      <AutoCompleteWrapper
        autocomplete="off"
        type="text"
        id={label}
        name={name}
        value={keyword}
        className={className}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
      />
      {results.length > 0 ? (
        <SearchResult>{renderResults}</SearchResult>
      ) : null}
    </>
  );
};

const AutoCompleteWrapper = styled.input`
  display: inline-block;
  width: ${(props) => props.width};
  height: 45px;
  padding: 0 10px;
  background-color: #EFF0F6;
  border-radius: 8px;
  box-sizing: border-box;
  line-height: 45px;
`;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  border: 1px solid #e9e9e9;
  position: absolute;
  z-index: 99;
  background-color: white;
  border-radius: 0.2rem;
`;

AutoCompleteWrapper.defaultProps = {
  width: "100%",
};

export default SearchBar;
