import React, { useEffect } from "react";
import ReactDom from "react-dom";

import { Divider, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./Popup.module.css";

const popupPlaceholderEl = document.getElementById("popup-placeholder");

const Popup = ({ status, message, onPopupClose, transitionState }) => {
  useEffect(() => {
    const timeout = setTimeout(() => onPopupClose(), 3000);

    return () => clearTimeout(timeout);
  }, [onPopupClose]);

  const popupState =
    transitionState === "entering" || transitionState === "entered"
      ? "opened"
      : "closed";

  const renderedPopup = (
    <Box className={styles.popupContainer} onClick={onPopupClose}>
      <div
        className={`${styles.popup} ${styles[`popup-${status}`]} ${
          styles[`popup-${popupState}`]
        }`}>
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

  return ReactDom.createPortal(renderedPopup, popupPlaceholderEl);
};

export default Popup;
