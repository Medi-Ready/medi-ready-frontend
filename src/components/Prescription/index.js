import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import styled from "styled-components";

import { getQueue, postMedicine, postPrescription } from "../../api";

import Queue from "./Queue";
import FlexBox from "../Shared/FlexBox";
import TextInput from "../Shared/TextInput";
import Button from "../Shared/Button";
import Checkbox from "../Shared/Checkbox";

const Prescription = () => {
  const [doseTime, setDoseTime] = useState([]);
  const [medicine, setMedicine] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [targetUserInfo, setTargetUserInfo] = useState({});
  const [isSubmitForm, setIsSubmitForm] = useState(false);

  const { name, picture } = targetUserInfo;
  const { data, refetch, isLoading } = useQuery("queue", getQueue);

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
      const { data } = result;
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

  const handleRefresh = () => {
    refetch();
  };

  const handleChange = (event) => {
    const { id, checked } = event.target;
    setDoseTime([...doseTime, id]);

    if (!checked) {
      setDoseTime(doseTime.filter(item => item !== id));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmitForm(true);

    const { duration, description } = event.target;

    const medicineIdList = medicineList.map(({ id }) => id);

    const prescriptionForm = {
      doseTime,
      date: new Date().toISOString(),
      duration: duration.value,
      medicines: medicineIdList,
      description: description.value,
      patient_id: targetUserInfo.patient_id,
    };

    prescriptionMutation.mutate(prescriptionForm);

    duration.value = "";
    description.value = "";
    setMedicineList([]);
    setDoseTime([]);
  };

  const doseTimeDatas = [
    { id: "morning", label: "아침", name: "doseTime" },
    { id: "lunch", label: "점심", name: "doseTime" },
    { id: "dinner", label: "저녁", name: "doseTime" },
    { id: "beforeBed", label: "취침전", name: "doseTime" },
  ];

  const doseTimeList = doseTimeDatas.map(({ id, label, name }) => {
    return (
      <Checkbox
        id={id}
        name={name}
        label={label}
        onChange={handleChange}
      />
    );
  });

  return (
    <>
      <FlexBox>
        <h2>Prescription</h2>
        <ButtonRight>
          <button type="button" onClick={handleRefresh}>Refresh</button>
        </ButtonRight>
      </FlexBox>

      <Wrapper>
        <FlexBox>
          <div>
            <UserInfo>
              <span>
                <img src={picture} alt={name} />
              </span>
              <b>{name}</b>
              {name && (
                <Badge color="green">Treating</Badge>
              )}
            </UserInfo>

            <form onSubmit={handleSearch}>
              <SearchBox>
                <TextInput label="search" name="search" placeholder="Enter Medicine Name" />
                <Button type="submit" text="Search" />
                <div>
                  {medicineList.map((item, i) => (
                    <TextInput
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
              {doseTimeList}
            </CheckboxList>
          </div>
        </FlexBox>

        <form onSubmit={handleSubmit}>
          <FlexBox>
            <div>
              <TextInput label="description" name="description" />
            </div>

            <InputButtonBox>
              <TextInput width="60px" label="duration" name="duration" />
              <span>일치</span>
              <Button type="submit" text="처방" />
            </InputButtonBox>
          </FlexBox>
        </form>
      </Wrapper>

      {!isLoading && (
        <Wrapper>
          <Queue
            Badge={Badge}
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
  padding: ${({ theme }) => theme.padding.default};
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

const ButtonRight = styled.div`
  text-align: right;
`;

export default Prescription;
