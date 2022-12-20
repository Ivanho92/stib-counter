import React, { useEffect } from "react";

import { Divider, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Popup.module.css";

const Popup = ({ status, message, onPopupClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => onPopupClose(), 3000);

    return () => clearTimeout(timeout);
  }, [onPopupClose]);

  return (
    <Box className={styles.popupContainer} onClick={onPopupClose}>
      <div className={`${styles.popup} ${status && styles[`popup-${status}`]}`}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton
            className={styles.closeModal}
            onClick={onPopupClose}
            variant="outline"
            aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Typography variant="body1" sx={{ padding: "1rem" }}>
          {message}
        </Typography>
      </div>
    </Box>
  );
};

export default Popup;
