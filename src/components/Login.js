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
    <>
      <h2>Login</h2>
      <button onClick={loginWithGoogle}>구글 로그인</button>
    </>
  );
};

export default Login;
