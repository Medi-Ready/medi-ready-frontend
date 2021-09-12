import React from "react";

const SearchBar = ({ results, keyword, updateField }) => {
  return (
    <div className="auto">
      <input
        className="search-bar"
        placeholder="Search"
        value={keyword}
      />
    </div>
  );
};

export default SearchBar;
