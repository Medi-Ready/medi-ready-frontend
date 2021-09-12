import React from "react";
import styled from "styled-components";

const HistoryListItem = ({ prescription, openModal, className }) => {
  const description = prescription.description;
  const date = prescription.created_at.slice(0, 10);
  const { name, picture } = prescription.patient.user;

  return (
    <ListItem onClick={openModal} className={className}>
      <div className="person">
        <span>
          <img src={picture} alt={name} />
        </span>
        <b>{name}</b>
      </div>
      <span>{description}</span>
      <span>{date}</span>
    </ListItem>
  );
};

const ListItem = styled.li`
  .person {
    display: flex;
    align-items: center;
    width: 20%;
    color: #767676;
    font-size: 14px;
  }

  .person img {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50px;
  }

  span {
    font-size: 14px;
    color: #767676;
  }
`;

export default HistoryListItem;
