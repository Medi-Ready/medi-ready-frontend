import firebase from "../config/firebase";
import { useQuery, useMutation } from "react-query";
import React, { useState, useEffect } from "react";

const postUser = async (user) => {
  await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: user,
  });
};

const Login = () => {
  const mutation = useMutation((user) => postUser(user));

  const { isLoading, isError, error, isSuccess, data } = mutation;

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { additionalUserInfo } = await firebase.auth().signInWithPopup(provider);
    const { email, name, picture } = additionalUserInfo.profile;

    const userData = {
      type: "pharmacist",
      email,
      name,
      picture,
    };

    mutation.mutate(userData);
  };

  return (
    <StyledLogin>
      <div>
        <h2 class="sr-only">Login</h2>

        <strong>Welcome back!</strong>
        <p>Sign in to your account to continue</p>

        <div className="button-box">
          <button onClick={loginWithGoogle}><span>Google Login</span></button>
        </div>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  div > * {
    display: block;
    text-align: center;
  }

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    margin-top: 28px;
    font-size: 14px;
    color: #767676;
  }

  .button-box {
    margin-top: 35px;
    padding: 25px 30px 28px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color.white};
  }

  button {
    padding: 3px 15px;
    border-radius: 5px;
    background-color: #2F49D1;
    font-size: 18px;
    color: ${({ theme }) => theme.color.white};
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }

  button span {
    display: inline-block;
    background: url("/google-logo.png") no-repeat left center;
    padding: 10px 10px 10px 50px;
  }
`;

export default Login;
