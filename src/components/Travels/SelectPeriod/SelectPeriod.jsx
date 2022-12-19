import React from "react";

import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";

import { Box } from "@mui/material";

import dayjs from "dayjs";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SelectPeriod = ({
  year,
  yearsList,
  onYearChange,
  month,
  monthsList,
  onMonthChange,
}) => {
  const theme = useTheme();
  const matchesTabletSize = useMediaQuery(theme.breakpoints.up("tablet"));

  const yearChangeHandler = (e) => {
    onYearChange(e);
  };

  const monthChangeHandler = (e) => {
    onMonthChange(e);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexDirection: matchesTabletSize ? "row" : "column",
      }}>
      <SelectMonth
        fullWidth={!matchesTabletSize}
        month={month}
        onMonthChange={monthChangeHandler}
        monthsList={[...new Set([dayjs().format("MM"), ...monthsList])]}
      />
      <SelectYear
        fullWidth={!matchesTabletSize}
        year={year}
        onYearChange={yearChangeHandler}
        yearsList={[...new Set([dayjs().format("YYYY"), ...yearsList])]}
      />
    </Box>
  );
};

export default SelectPeriod;
