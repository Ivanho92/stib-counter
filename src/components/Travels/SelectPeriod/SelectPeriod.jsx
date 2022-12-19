import React from "react";

// import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";

import dayjs from "dayjs";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SelectPeriod = ({ year, yearsList, onYearChange }) => {
  const theme = useTheme();
  const matchesTabletSize = useMediaQuery(theme.breakpoints.up("tablet"));

  const yearChangeHandler = (e) => {
    onYearChange(e);
  };

  return (
    <div>
      {/* <SelectMonth
        fullWidth={!matchesTabletSize}
        month={"test"}
        onMonthChange={"test"}
        monthsList={["test"]}
      /> */}
      <SelectYear
        fullWidth={!matchesTabletSize}
        year={year}
        onYearChange={yearChangeHandler}
        yearsList={[...new Set([dayjs().format("YYYY"), ...yearsList])]}
      />
    </div>
  );
};

export default SelectPeriod;
