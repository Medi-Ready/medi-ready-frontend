import firebase from "../config/firebase";
import { useMutation } from "react-query";
import React, { useState, useEffect } from "react";

const Login = () => {
  const mutation = useMutation(user => fetch("/api/login", {
    method: "POST",
    body: user,
  }));

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
