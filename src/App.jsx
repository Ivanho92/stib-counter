import React from "react";
import TravelsContextProvider from "./store/travels-context";

import { Stack, Container, Divider } from "@mui/material";

import Footer from "./components/Footer";
import Form from "./components/Form";
import TravelsList from "./components/TravelsList";
import Header from "./components/Header";
import ThemeProvider from "./store/mui-theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Container component="main" maxWidth="md">
        <Stack spacing={3}>
          <Header />

          <TravelsContextProvider>
            <Form />
            <Divider />
            <TravelsList />
          </TravelsContextProvider>
        </Stack>
      </Container>

      <Footer />
    </ThemeProvider>
  );
};

export default App;
