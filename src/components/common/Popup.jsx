import React from "react";

import { Box, Stack, Typography, Button } from "@mui/material";

import styles from "./Popup.module.css";

const Popup = ({ status, message, onPopupClose }) => {
  return (
    <Box className={styles.popupContainer}>
      <Stack
        spacing={1}
        className={`${styles.popup} ${status && styles[`popup-${status}`]}`}>
        <Typography variant="body1">{message}</Typography>
        <Button onClick={onPopupClose} variant="outline" color={status}>
          close
        </Button>
      </Stack>
    </Box>
  );
};

export default Popup;
