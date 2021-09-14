import React, { useState } from "react";
import { useMutation } from "react-query";

import styled from "styled-components";
import { postMedicine } from "../../api";

import SearchBar from "../SearchBar";
import Button from "../Shared/Button";
import TextInput from "../Shared/TextInput";

const SearchForm = ({ medicineList, setMedicineList }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const medicineMutation = useMutation(postMedicine, {
    onSuccess: (result) => {
      const { data } = result;

      if (data) {
        setKeyword("");
        setSearchResult([]);
        setMedicineList(prevItems => [...prevItems, {
          id: data.medicine_id,
          name: data.name,
        }]);
      }
    },
  });

  const handleSearch = (event) => {
    event.preventDefault();

    if (!keyword) {
      return;
    }

    medicineMutation.mutate({ name: keyword });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSearch} autoComplete="off">
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
        <StyledButton type="submit" text="Search">추가</StyledButton>
        <div>
          {medicineList.map((item, i) => (
            <TextInput
              disabled
              key={medicineList[i].id, i}
              name="medicine"
              label={`medicine${i}`}
              value={item.name.length > 20 ? item.name.slice(0, 20) + "…" : item.name}
              readOnly
            />
          ))}
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 0;
  }

  div input {
    margin-top: 10px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

export default SearchForm;
