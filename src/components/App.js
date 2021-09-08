import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";

import GlobalStyles from "../styles";
import theme from "../styles/theme";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Login from "./Login";
import History from "./History";
import Settings from "./Settings";
import DashboardList from "./DashboardList";
import Prescription from "../components/Prescription";
import { ModalProvider } from "../contexts/ModalContext";
import { getAuthCheck } from "../api";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { result, data } = await getAuthCheck();

      if (result === "success") {
        setUser(data);
      } else {
        setUser("");
        history.push("/login");
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
            <Header />
            <Article>
              <ModalProvider>
                <Switch>
                  <Route path="/dashboard">
                    <DashboardList />
                  </Route>
                  <Route path="/prescription">
                    <Prescription />
                  </Route>
                  <Route path="/prescriptions">
                    <History />
                  </Route>
                  <Route path="/prescriptions/:id">

                  </Route>
                  <Route path="/settings">
                    <Settings />
                  </Route>
                  <Route path="/login">
                    <Login onSuccess={setUser} />
                  </Route>
                  <Route path="/" exact>
                    <Redirect to="/dashboard" />
                  </Route>
                </Switch>
              </ModalProvider>
            </Article>
            <Footer />
          </Section>
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
