import React from "react";

import { Stack, Container } from "@mui/material";

import Footer from "./components/Footer/Footer";
import Travels from "./components/Travels/Travels";
import Header from "./components/Header/Header";
import ThemeProvider from "./store/mui-theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Container component="main" maxWidth="md">
        <Stack spacing={3}>
          <Header />
          <Travels />
        </Stack>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;

// TODO setTimeout for popup container
// TODO use portals for popup
// TODO animate popup
