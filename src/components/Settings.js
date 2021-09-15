import React, { useState } from "react";
import { useMutation } from "react-query";

import { updateSettings } from "../api";

import styled from "styled-components";
import Button from "./Shared/Button";
import Loading from "./Shared/Loading";
import TextInput from "./Shared/TextInput";

const Settings = () => {
  const [input, setInput] = useState({ name: "", address: "" });
  const { isLoading, mutate, isSuccess } = useMutation(updateSettings);

  if (isLoading) {
    return <Loading />;
  }

  const handleChange = (event) => {
    const activeInput = {
      ...input,
      [event.target.name]: event.target.value,
    };

    setInput(activeInput);
  };

  const { name, address } = input;

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate({ name, address });
  };

  return (
    <Wrapper>
      <h2>Settings</h2>

      <form onSubmit={handleSubmit}>
        <StyledInputText name="name" placeholder="pharmacy name" value={name} onChange={handleChange} />
        <StyledInputText name="address" placeholder="pharmacy address" value={address} onChange={handleChange} />
        <Button type="submit">전송</Button>
      </form>

      {isSuccess && (
        <>
          <p>Pharmacy name : {input.name}</p>
          <p>Pharmacy address : {input.address}</p>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;

  input {
    margin-top: 20px;
  }

  button {
    margin-top: 20px;
  }
`;

const StyledInputText = styled(TextInput)`
  background-color: #fff;
`;

export default Settings;
