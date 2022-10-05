import React from "react";
import TravelsContextProvider from "./store/travels-context";

import { Stack, Container, Divider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Footer from "./components/Footer";
import Form from "./components/Form";
import TravelsList from "./components/TravelsList";
import Header from "./components/Header";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#007CC2",
        },
        secondary: {
            main: "#EF3E42",
        },
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 490,
            md: 720,
            // laptop: 1024,
            // desktop: 1200,
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
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
