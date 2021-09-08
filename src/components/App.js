import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyles from "../styles";
import theme from "../styles/theme";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Login from "./Login";
import History from "./History";
import Settings from "./Settings";
import DashboardList from "./DashboardList";
import Prescription from "./Prescription";
import { ModalProvider } from "../contexts/ModalContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Navigation />

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

                  <Route path="/history">
                    <History />
                  </Route>

                  <Route path="/history/:id">

                  </Route>

                  <Route path="/settings">
                    <Settings />
                  </Route>

                  <Route path="/login">
                    <Login />
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
