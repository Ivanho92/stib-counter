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
        <Box
          sx={{
            display: "flex",
            gap: ".5rem",
            flexWrap: "nowrap",
            alignItems: "center",
          }}>
          <span>Travels Counter</span>
          <img src="/logo512.png" alt="" className={styles.logo} />
        </Box>
      </Typography>
    </Box>
  );
};

export default Header;
