import firebase from "../config/firebase";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

import styled from "styled-components";

import { postLogin } from "../api";
import Loading from "./Shared/Loading";
import Error from "./Shared/Error";

const Login = ({ onSuccess }) => {
  const history = useHistory();

  const { mutate, isLoading, error, isError } = useMutation(postLogin, {
    onSuccess: (result) => {
      const { data } = result;

      onSuccess(data);
      history.push("/");
    },
  });

  if (isError) {
    return <Error error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { additionalUserInfo } = await firebase.auth().signInWithPopup(provider);
      const { email, name, picture } = additionalUserInfo.profile;

      const userData = {
        name,
        email,
        picture,
        user_type: "pharmacist",
      };

      mutate(userData);
    } catch (err) {}
  };

  return (
    <Wrapper>
      <div>
        <h2 className="sr-only">Login</h2>

        <strong>Welcome back!</strong>
        <p>Sign in to your account to continue</p>

        <ButtonBox>
          <button onClick={loginWithGoogle}><span>Google Login</span></button>
        </ButtonBox>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
`;

const ButtonBox = styled.div`
  margin-top: 35px;
  padding: 25px 30px 28px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.white};

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
