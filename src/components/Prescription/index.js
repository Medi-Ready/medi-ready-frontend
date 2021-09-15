import { useMutation } from "react-query";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { postPrescription } from "../../api";

import Queue from "./Queue";
import UserInfo from "./UserInfo";
import InputForm from "./InputForm";
import SearchForm from "./SearchForm";
import FlexBox from "../Shared/FlexBox";
import Checkbox from "../Shared/Checkbox";

const Prescription = () => {
  const [formData, setFormData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [medicineList, setMedicineList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [doseTimeList, setDoseTimeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDoseTimeList(doseTimeDataList);
  }, []);

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  const prescriptionMutation = useMutation(postPrescription);

  const handleChange = (event) => {
    const { id, checked } = event.target;

    if (id === "all") {
      let allCheckedList = doseTimeList.map((time) => {
        return { ...time, isChecked: checked };
      });

      setDoseTimeList(allCheckedList);
    } else {
      let checkedList = doseTimeList.map((time) =>
        time.id === id ? { ...time, isChecked: checked } : time,
      );

      setDoseTimeList(checkedList);
    }
  };

  const handleSubmit = () => {
    const doseTimes = {};

    doseTimeList.forEach(({ isChecked, id }) => {
      if (isChecked) {
        if (id === "beforeBed") {
          return doseTimes["before_bed"] = true;
        }

        doseTimes[id] = true;
      }
    });

    const prescriptionForm = {
      doseTimes,
      medicines: medicineList,
      duration: formData.duration,
      description: formData.description,
      date: new Date().toISOString(),
      patient_id: selectedUser.patient_id,
    };

    prescriptionMutation.mutate(prescriptionForm);

    setErrorMessage("");
    setSelectedUser({});
    setMedicineList([]);
    setIsSubmit(false);
    setDoseTimeList(doseTimeDataList);
  };

  const doseTimeDataList = [
    { id: "morning", label: "아침", name: "doseTime" },
    { id: "lunch", label: "점심", name: "doseTime" },
    { id: "dinner", label: "저녁", name: "doseTime" },
    { id: "beforeBed", label: "취침전", name: "doseTime" },
  ];

  return (
    <div>
      <h2>Prescription</h2>

      <BoxWrapper>
        <FlexBox>
          <div>
            <UserInfo selectedUser={selectedUser} isSubmit={isSubmit} />
            <SearchForm medicineList={medicineList} setMedicineList={setMedicineList} />
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
                    key={id}
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

        <InputForm
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          setFormData={setFormData}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </BoxWrapper>

      <BoxWrapper>
        <Queue
          isSubmit={isSubmit}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </BoxWrapper>
    </div>
  );
};

const BoxWrapper = styled.div`
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

export default Prescription;
