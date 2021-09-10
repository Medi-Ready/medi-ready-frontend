import React, { useState } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

const Queue = ({ Badge, queue, targetUser, setTargetUserInfo }) => {
  const { data } = queue;

  const handleUser = (event) => {
    event.preventDefault();

    const targetUserInfo = {
      name: event.currentTarget.dataset.name,
      picture: event.currentTarget.dataset.picture,
      waiting: false,
    };

    setTargetUserInfo(targetUserInfo);
  };

  return (
    <Wrapper>
      <h2>Waiting List</h2>

      <ul>
        {data.length && data.map((data, index) => {
          const { name, picture } = data;

          return (
            <li key={name, index}>
              <a href="#" onClick={handleUser} data-picture={picture} data-name={name}>
                <img alt={name} src={picture} />
                <b>{name}</b>
                {
                  targetUser.name !== name ? <Badge>Waiting</Badge> : <Badge color="green">Treating</Badge>
                }
              </a>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

Queue.propTypes = {
  targetUser: PropTypes.string.isRequired,
  queue: PropTypes.object.isRequired,
  Badge: PropTypes.object.isRequired,
  setTargetUserInfo: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  padding-top: 10px;

  ul {
    padding-top: 5px;

    li {
      position: relative;
      border-bottom: 1px solid #EEE;

      em {
        top: 23px;
      }
    }
  }

  a {
    display: block;
    padding: 15px 0;

      img {
        display: inline-block;
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }

  b {
    margin-left: 20px;
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

export default Queue;
