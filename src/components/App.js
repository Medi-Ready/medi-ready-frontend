import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { ThemeProvider } from "styled-components";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { getAuthCheck } from "../api";
import { ModalProvider } from "../contexts/ModalContext";

import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import History from "./History";
import Settings from "./Settings";
import theme from "../styles/theme";
import GlobalStyles from "../styles";
import Navigation from "./Navigation";
import DashboardList from "./DashboardList";
import Prescription from "../components/Prescription";
import Error from "./Shared/Error";

const queryClient = new QueryClient();

const App = () => {
  const history = useHistory();

  const [user, setUser] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data, result } = await getAuthCheck();

        if (result === "success") {
          setUser(data);
        } else {
          setUser("");
          history.push("/login");
        }

      } catch (error) {
        return <Error error={error.message} />;
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Navigation isLoggedIn={user} onLogout={setUser} />
          <Section>
            <Header userInfo={user} />
            <Article>
              <ModalProvider>
                <Switch>
                  <Route path="/dashboard">
                    <DashboardList pageTitle="Dashboard" userInfo={user} />
                  </Route>
                  <Route path="/prescription" userInfo={user}>
                    <Prescription pageTitle="Prescription" />
                  </Route>
                  <Route path="/prescriptions">
                    <History pageTitle="History" queryClient={queryClient} />
                  </Route>
                  <Route path="/settings">
                    <Settings pageTitle="Settings" />
                  </Route>
                  <Route path="/login">
                    <Login pageTitle="Login" onSuccess={setUser} />
                  </Route>
                  <Route path="/error">
                    <Error />
                  </Route>
                  <Route path="/" exact>
                    <Redirect to="/dashboard" />
                  </Route>
                </Switch>
              </ModalProvider>
            </Article>
            <Footer />
          </Section>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Section = styled.section`
  width: calc(100% - 230px);
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.grey};
`;

const Article = styled.article`
  height: calc(100% - 115px);
  padding: ${({ theme }) => theme.padding.big};
`;

export default App;
