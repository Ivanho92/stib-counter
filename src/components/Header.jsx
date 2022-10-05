import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box display="flex" alignItems="center" gap={2} mt={4}>
            <img src="/logo-stib.png" alt="STIB logo" style={{ width: "7%" }} />
            <Typography variant="h1" color="inherit" sx={{ fontSize: "3.052rem" }}>
                STIB Travels Counter
            </Typography>
        </Box>
    );
};

export default Header;
