import React, { useState } from "react";
import { useMutation } from "react-query";

import { updateSettings } from "../api";

import styled from "styled-components";
import Button from "./Shared/Button";
import TextInput from "./Shared/TextInput";

const Settings = () => {
  const [input, setInput] = useState({ name: "", address: "" });
  const [pharmacist, setPharmacist] = useState({});

  const pharmacistMutation = useMutation(updateSettings);

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

    pharmacistMutation.mutate({ name, address });
  };

  return (
    <Wrapper>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <StyledInputText name="name" placeholder="약국이름" value={name} onChange={handleChange} />
        <StyledInputText name="address" placeholder="약국주소" value={address} onChange={handleChange} />
        <Button type="submit">전송</Button>
      </form>
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
