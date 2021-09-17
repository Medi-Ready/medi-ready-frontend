import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { getAuthCheck } from "./api";
import { ModalProvider } from "./contexts/ModalContext";

import GlobalStyles from "./styles";
import theme from "./styles/theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Error from "./components/Shared/Error";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Prescription from "./pages/Prescription";
import DashboardList from "./pages/Dashboard";
import PrivateRoute from "./components/Shared/PrivateRoute";

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
        return <Error error={error} />;
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
                <PrivateRoute
                  path="/dashboard"
                  userInfo={user}
                  isAuthenticated={user}
                  component={DashboardList}
                />
                <PrivateRoute
                  userInfo={user}
                  path="/prescription"
                  isAuthenticated={user}
                  component={Prescription}
                />
                <PrivateRoute
                  component={History}
                  isAuthenticated={user}
                  path="/prescriptions"
                  queryClient={queryClient}
                />
                <PrivateRoute
                  path="/settings"
                  isAuthenticated={user}
                  component={Settings}
                />
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
