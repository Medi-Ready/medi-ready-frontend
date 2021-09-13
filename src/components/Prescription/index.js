import { useQuery, useMutation } from "react-query";
import React, { useState, useEffect, useContext, useCallback } from "react";

import { debounce } from "lodash";
import styled from "styled-components";
import { ModalContext } from "../../contexts/ModalContext";
import { getMedicineNames, getQueue, postMedicine, postPrescription } from "../../api";

import Queue from "./Queue";
import Badge from "../Shared/Badge";
import SearchBar from "../SearchBar";
import Button from "../Shared/Button";
import FlexBox from "../Shared/FlexBox";
import Checkbox from "../Shared/Checkbox";
import TextArea from "../Shared/TextArea";
import TextInput from "../Shared/TextInput";
import ConfirmModal from "../Shared/Modal/ConfirmModal";

const Prescription = () => {
  const [message, setMessage] = useState("");
  const [keyword, setKeyword] = useState("");
  const [medicine, setMedicine] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [doseTimeList, setDoseTimeList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [targetUserInfo, setTargetUserInfo] = useState({});
  const [isPrescriptionSubmit, setIsPrescriptionSubmit] = useState(false);

  const { name, picture } = targetUserInfo;
  const { handleModal } = useContext(ModalContext);

  useEffect(() => {
    setDoseTimeList(doseTimeDataList);
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [duration, description, targetUserInfo, medicineList, doseTimeList]);

  const onChangeHanlder = (event, setState) => {
    setState(event.target.value);
  };

  const { data, isLoading } = useQuery("queue", getQueue, {
    refetchInterval: 3000,
  });

  const medicineNamesMutation = useMutation(getMedicineNames, {
    onSuccess: (result) => {
      let { data } = result;

      if (data) {
        data = data.slice(0, 5);
        setSearchResult(data);
      }
    },
  });

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);

    if (newKeyword) {
      return searchMedicines(newKeyword);
    }

    setSearchResult([]);
  };

  const searchMedicines = useCallback(
    debounce((newKeyword) => {
      medicineNamesMutation.mutate({ keyword: newKeyword });
    }, 300),
    [],
  );

  const medicineMutation = useMutation(postMedicine, {
    onSuccess: (result) => {
      const { data } = result;

      if (data) {
        setMedicine(data);
        setKeyword("");
        setSearchResult([]);
        setMedicineList(prevItems => [...prevItems, {
          id: data.medicine_id,
          name: data.name,
        }]);
      } else {
        setErrorMessage("해당 약은 존재하지 않습니다.");
      }
    },
  });

  const prescriptionMutation = useMutation(postPrescription, {
    onSuccess: ({ result }) => {
      if (result === "success") {
        setMessage("처방전 전송이 완료되었습니다.");
      }
    },
  });

  const handleSearch = (event) => {
    event.preventDefault();

    const name = event.target.search.value;
    event.target.search.value = "";

    if (!name) {
      return;
    }

    medicineMutation.mutate({ name });
  };

  const handleChange = (event) => {
    const { id, checked } = event.target;

    if (id === "all") {
      const allCheckedList = doseTimeList.map((time) => {
        return { ...time, isChecked: checked };
      });

      setDoseTimeList(allCheckedList);
    } else {
      const checkedList = doseTimeList.map((time) =>
        time.id === id ? { ...time, isChecked: checked } : time,
      );

      setDoseTimeList(checkedList);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const doseTimes = [];

    for (const doseTime of doseTimeList) {
      if (doseTime.isChecked) {
        doseTimes.push(doseTime.id);
      }
    }

    const medicineIdList = medicineList.map(({ id }) => id);

    handleModal(<ConfirmModal setIsPrescriptionSubmit={setIsPrescriptionSubmit} />);

    const prescriptionForm = {
      duration,
      doseTimes,
      description,
      medicines: medicineIdList,
      date: new Date().toISOString(),
      patient_id: targetUserInfo.patient_id,
    };

    if (isPrescriptionSubmit) {
      setDuration("");
      setDescription("");
      setErrorMessage("");
      setMedicineList([]);
      setTargetUserInfo({});
      setIsPrescriptionSubmit(false);
      setDoseTimeList(doseTimeDataList);
      prescriptionMutation.mutate(prescriptionForm);
    }
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
            <form onSubmit={handleSearch} autoComplete="off">
              <SearchBox>
                <SearchBar
                  type="text"
                  name="search"
                  label="search"
                  keyword={keyword}
                  results={searchResult}
                  setValue={handleKeywordChange}
                />
                <SearchBarButton type="submit" text="Search">추가</SearchBarButton>
                <div>
                  {medicineList.map((item, i) => (
                    <TextInput
                      disabled
                      key={item.id, i}
                      name="medicine"
                      label={`medicine${i}`}
                      value={item.name.length > 20 ? item.name.slice(0, 20) + "…" : item.name}
                    />
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
                onChange={handleChange}
                checked={doseTimeList.filter(time => time?.isChecked !== true).length < 1}
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
              <TextArea name="description" onChange={(event) => onChangeHanlder(event, setDescription)}></TextArea>
            </div>
            <InputButtonBox>
              <TextInput width="60px" label="duration" name="duration" onChange={(event) => onChangeHanlder(event, setDuration)} />
              <span>일치</span>
              <Button type="submit">처방</Button>
            </InputButtonBox>
          </FlexBox>
        </form>
        {message && <p>처방전 전송이 완료되었습니다.</p>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Wrapper>

      {!isLoading && (
        <Wrapper>
          <Queue
            queue={data}
            targetUser={targetUserInfo}
            setTargetUserInfo={setTargetUserInfo}
          />
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

const SearchBarButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
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

export default Prescription;
