import React from "react";
import { useQuery } from "react-query";

import styled from "styled-components";
import WaitingList from "./WaitingList";
import FlexBox from "../Shared/FlexBox";
import TextInput from "../Shared/TextInput";
import Button from "../Shared/Button";

const Prescription = () => {
  const handleSubmit = async () => {
  };

  return (
    <>
      <h2>Prescription</h2>

      <Wrapper>
        <form onSubmit={handleSubmit}>
          <FlexBox>
            <div>
              <UserInfo>
                <b>Kathryn Murphy</b>
                <span>1995.05.24</span>
                <Badge color="green">Treating</Badge>
              </UserInfo>
              <TextInput label="search" placeholder="Enter Medicine Name" />
            </div>

            <div>
              <CheckboxList>
                <Checkbox>
                  <label htmlFor="all">전체</label>
                  <input type="checkbox" id="all" name="time" />
                </Checkbox>

                <Checkbox>
                  <label htmlFor="morning">아침</label>
                  <input type="checkbox" id="morning" name="time" />
                </Checkbox>

                <Checkbox>
                  <label htmlFor="lunch">점심</label>
                  <input type="checkbox" id="lunch" name="time" />
                </Checkbox>

                <Checkbox>
                  <label htmlFor="dinner">저녁</label>
                  <input type="checkbox" id="dinner" name="time" />
                </Checkbox>

                <Checkbox>
                  <label htmlFor="beforeBed">취침전</label>
                  <input type="checkbox" id="beforeBed" name="time" />
                </Checkbox>
              </CheckboxList>

              <Button type="button" text="Add" />
            </div>
          </FlexBox>

          <FlexBox>
            <div>
              <TextInput />
            </div>
            <InputButtonBox>
              <TextInput width="60px" label="복약지도" name="duration" />
              <span>일치</span>
              <Button type="submit" text="처방" />
            </InputButtonBox>
          </FlexBox>
        </form>
      </Wrapper>

      <Wrapper>
        <WaitingList Badge={Badge} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  padding: ${({ theme }) => theme.padding.default};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
`;

const CheckboxList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 450px;
  padding-left: 15px;
  vertical-align: top;

  + button {
    margin: 5px 0 0 20px;
    vertical-align: top;
  }
`;

const Checkbox = styled.li`
  min-width: 60px;
  text-align: center;

  label {
    overflow: hidden;
    display: block;
    min-height: 22px;
    font-size: 14px;
    line-height: 1;
    box-sizing: border-box;
  }

  input {
    position: relative;
    width: 22px;
    height: 22px;
    margin-top: 15px;
    border-radius: 3px;
    background: #dcdcdd;
    -webkit-appearance: none;
  }

  input:checked {
    border-color: #665196 !important;
    background: #fff;
  }

  input[type=checkbox]:checked {
    background: #057bff;
  }

  input:before {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-color: #fff;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  input[type=checkbox]:before {
    width: 11px;
    height: 4px;
    margin: -5px 0 0 -7px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type=checkbox]:checked:before {
    content: "";
    border: solid #fff;
    border-width: 0 0 2px 2px;
  }
`;

const UserInfo = styled.div`
  position: relative;
  padding-bottom: 20px;

  b {
    font-size: 18px;
    font-weight: 600;
  }

  span {
    display: inline-block;
    margin-left: 20px;
    font-size: 12px;
  }

  em {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Badge = styled.em`
  padding: 3px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color === "green" ? "#eefcf5" : "#fff7ea"};
  color: ${(props) => props.color === "green" ? "#4bde97" : "#ffac32"};
  font-size: 13px;
`;

const InputButtonBox = styled.div`
  padding-left: 10px;

  > * {
    margin-left: 20px;
  }
`;

export default Prescription;
