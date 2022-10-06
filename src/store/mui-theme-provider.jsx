import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#007CC2",
        },
        secondary: {
            main: "#EF3E42",
            shade: "#FDECEC"
        },
        error: {
            main: "#EF3E42",
        }
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 525,
            md: 720,
        },
    },
});

export const ThemeContext = React.createContext();

const MuiTheme = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
