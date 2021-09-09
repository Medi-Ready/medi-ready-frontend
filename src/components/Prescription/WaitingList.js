import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const WaitingList = ({ Badge }) => {
  return (
    <Wrapper>
      <h2>Waiting List</h2>
      <ul>
        <li>
          <b>Heo Kenhaeng</b>
          <span>1900.00.24</span>
          <Badge>Wating</Badge>
        </li>
      </ul>
    </Wrapper>
  );
};

WaitingList.propTypes = {
  Badge: PropTypes.string,
};

const Wrapper = styled.div`
  padding-top: 10px;

  ul {
    padding-top: 5px;
  }

  li {
    position: relative;
    border-bottom: 1px solid #EEE;
    padding: 15px;
  }

  b {
    font-size: 14px;
  }

  span {
    display: inline-block;
    margin-left: 50px;
    color: #767676;
    font-size: 14px;
  }

  em {
    position: absolute;
    right: 10px;
  }
`;

export default WaitingList;
