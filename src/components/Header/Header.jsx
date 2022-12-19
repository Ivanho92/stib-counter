import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "./Header.module.css";

const Header = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                mt: 4,
            }}>
            {!navigator.onLine && (
                <Typography variant="body2" color={theme.palette.secondary.main}>
                    Offline Mode
                </Typography>
            )}
            <Typography variant="h1" color="inherit" sx={{ fontSize: "3.052rem" }}>
                STIB Travels{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                    Counter&nbsp;
                    <img src="/logo-stib.png" alt="STIB logo" className={styles.logo} />
                </span>
            </Typography>
        </Box>
    );
};

export default Header;
