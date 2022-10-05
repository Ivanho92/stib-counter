import React from "react";
import { Box, Typography } from "@mui/material";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <Box
            sx={{
                mt: 4,
            }}>
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
