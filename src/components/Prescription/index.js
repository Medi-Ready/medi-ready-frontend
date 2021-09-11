import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import styled from "styled-components";

import { getQueue, postMedicine, postPrescription } from "../../api";

import Queue from "./Queue";
import Badge from "../Shared/Badge";
import Button from "../Shared/Button";
import FlexBox from "../Shared/FlexBox";
import Checkbox from "../Shared/Checkbox";
import TextInput from "../Shared/TextInput";

const Prescription = () => {
  const [message, setMessage] = useState("");
  const [medicine, setMedicine] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [doseTimeList, setDoseTimeList] = useState([]);
  const [targetUserInfo, setTargetUserInfo] = useState({});

  const { name, picture } = targetUserInfo;

  const { data, isLoading } = useQuery("queue", getQueue, {
    refetchInterval: 3000,
  });

  useEffect(() =>
    setDoseTimeList(doseTimeDataList), [],
  );

  const medicineMutation = useMutation(postMedicine, {
    onSuccess: (result) => {
      const { data } = result;

      if (data) {
        setMedicine(data);
        setMedicineList(prevItems => [...prevItems, {
          id: data.medicine_id,
          name: data.name,
        }]);
      }
    },
  }, {
    manual: true,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const prescriptionMutation = useMutation(postPrescription, {
    onSuccess: (result) => {
      setMessage("처방전 전송이 완료되었습니다.");
    },
  }, {
    manual: true,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (event) => {
    event.preventDefault();

    medicineMutation.mutate({ name: event.target.search.value });

    event.target.search.value = "";
  };

  const handleChange = (event) => {
    const { id, checked } = event.target;

    if (id === "all") {
      let allCheckedList = doseTimeList.map((time) => {
        return { ...time, isChecked: checked };
      });

      setDoseTimeList(allCheckedList);
    } else {
      let checkedList = doseTimeList.map((time) =>
        time.id === id ? { ...time, isChecked: checked } : time
      );

      setDoseTimeList(checkedList);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { duration, description } = event.target;
    const doseTimes = [];

    for (const doseTime of doseTimeList) {
      if (doseTime.isChecked) {
        doseTimes.push(doseTime.id);
      }
    }

    if (!targetUserInfo) {
      setErrorMessage("대기 환자를 선택해주세요.");
      return;
    }

    if (!doseTimes.length) {
      setErrorMessage("복용 시간을 체크해주세요.");
      return;
    }

    if (!doseTimes.length) {
      setErrorMessage("복용 시간을 체크해주세요.");
      return;
    }

    if (!description.value) {
      setErrorMessage("복약지도는 필수 항목입니다.");
      return;
    }

    if (!duration.value) {
      setErrorMessage("복용기간을 입력해주세요.");
      return;
    }

    const medicineIdList = medicineList.map(({ id }) => id);

    const prescriptionForm = {
      doseTimes,
      duration: duration.value,
      medicines: medicineIdList,
      date: new Date().toISOString(),
      description: description.value,
      patient_id: targetUserInfo.patient_id,
    };

    prescriptionMutation.mutate(prescriptionForm);

    duration.value = "";
    description.value = "";

    setMedicineList([]);
    setTargetUserInfo({});
    setDoseTimeList(doseTimeDataList);
  };

  const doseTimeDataList = [
    { id: "morning", label: "아침", name: "doseTime" },
    { id: "lunch", label: "점심", name: "doseTime" },
    { id: "dinner", label: "저녁", name: "doseTime" },
    { id: "beforeBed", label: "취침전", name: "doseTime" },
  ];

  return (
    <>
      <FlexBox>
        <h2>Prescription</h2>
      </FlexBox>

      <Wrapper>
        <FlexBox>
          <div>
            <UserInfo>
              {name && (
                <>
                  <span>
                    <img src={picture} alt={name} />
                  </span>
                  <b>{name}</b>
                  <Badge color="green">Treating</Badge>
                </>
              )}
            </UserInfo>

            <form onSubmit={handleSearch}>
              <SearchBox>
                <TextInput
                  label="search"
                  name="search"
                  placeholder="Enter Medicine Name"
                />
                <Button type="submit" text="Search" />
                <div>
                  {medicineList.map((item, i) => (
                    <TextInput
                      key={item.id}
                      label={`medicine${i}`}
                      value={item.name.slice(0, 35) + "…"}
                      name="medicine"
                      disabled />
                  ))}
                </div>
              </SearchBox>
            </form>
          </div>

          <div>
            <CheckboxList>
              <Checkbox
                id="all"
                name="all"
                label="전체"
                checked={doseTimeList.filter(time => time?.isChecked !== true).length < 1}
                onChange={handleChange}
              />
              {doseTimeList.map((time) => {
                const { id, name, label } = time;

                return (
                  <Checkbox
                    checked={time?.isChecked || false}
                    id={id}
                    name={name}
                    label={label}
                    onChange={handleChange}
                  />
                );
              })}
            </CheckboxList>
          </div>
        </FlexBox>

        <form onSubmit={handleSubmit}>
          <FlexBox>
            <div>
              <TextArea name="description"></TextArea>
            </div>
            <InputButtonBox>
              <TextInput width="60px" label="duration" name="duration" />
              <span>일치</span>
              <Button type="submit" text="처방" />
            </InputButtonBox>
          </FlexBox>
        </form>
        {message && <Message>{message}</Message>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Wrapper>

      {!isLoading && (
        <Wrapper>
          <Queue
            queue={data}
            targetUser={targetUserInfo}
            setTargetUserInfo={setTargetUserInfo} />
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 20px 20px 35px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;

const CheckboxList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 450px;
  padding-left: 15px;
  vertical-align: top;
`;

const UserInfo = styled.div`
  position: relative;
  padding-bottom: 20px;

  b {
    display: inline-block;
    margin-left: 12px;
    font-size: 18px;
    font-weight: 600;
  }

  span {
    display: inline-block;
    font-size: 12px;

    img {
        display: inline-block;
        width: 40px;
        object-fit: cover;
        border-radius: 50%;
        vertical-align: middle;
      }
  }

  em {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const SearchBox = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 0;
  }

  div input {
    margin-top: 10px;
  }
`;

const InputButtonBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding-left: 10px;

  > * {
    margin-left: 20px;
  }
`;

const TextArea = styled.textarea`
  min-height: 100px;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 8px;
  background-color: #EFF0F6;
  outline: none;
  overflow: auto;
  box-shadow: none;
  resize: none;
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

export default Prescription;
