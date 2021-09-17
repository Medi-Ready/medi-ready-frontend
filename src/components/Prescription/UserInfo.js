import React from "react";
import styled from "styled-components";

import Badge from "../../components/Shared/Badge";

const UserInfo = ({ selectedUser }) => {
  const { name, picture } = selectedUser;

  return (
    <Wrapper>
      {name && (
        <>
          <span>
            <img src={picture} alt={name} />
          </span>
          <b>{name}</b>
          <Badge color="green">Treating</Badge>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default UserInfo;
