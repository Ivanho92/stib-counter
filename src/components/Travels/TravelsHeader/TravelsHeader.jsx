import React from "react";

import { Box, Typography, Chip } from "@mui/material";

import { useTheme } from "@mui/material/styles";

const TravelsHeader = ({ itemsTotal }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
      <Typography variant="h2" sx={{ fontSize: "1.953rem" }}>
        Travels
      </Typography>
      <Box display="flex" gap={1} alignItems="center">
        <Typography variant="body1">Total : </Typography>
        <Chip
          sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
          label={itemsTotal}
        />
      </Box>
    </Box>
  );
};

export default TravelsHeader;
