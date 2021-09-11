import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const HistoryListItem = ({ data, openModal, className }) => {
  return (
    <ListItem onClick={openModal} className={className}>
      <div className="person">
        <img src={data ? "https://picsum.photos/100" : ""} alt="photo" />
        <b>{data ? data.name : ""}</b>
      </div>
      <span>{data ? data.status : ""}</span>
      <span>{data ? data.date : ""}</span>
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
