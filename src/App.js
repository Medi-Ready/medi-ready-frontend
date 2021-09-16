import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";

import { getAuthCheck } from "./api";
import { ModalProvider } from "./contexts/ModalContext";

import theme from "./styles/theme";
import GlobalStyles from "./styles";
import Login from "./pages/Login";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./components/Shared/Error";
import Prescription from "./pages/Prescription";
import Navigation from "./components/Navigation";
import DashboardList from "./pages/DashboardList";

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

export default App;
