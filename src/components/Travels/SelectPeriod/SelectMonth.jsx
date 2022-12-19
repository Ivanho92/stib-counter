import React from "react";

import dayjs from "dayjs";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectMonth = ({ fullWidth, month, onMonthChange, monthsList }) => {
  const monthChangeHandler = (e) => {
    onMonthChange(e.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id="select-month-label">Month</InputLabel>
        <Select
          labelId="select-month-label"
          id="select-month"
          value={month}
          label="Month"
          onChange={monthChangeHandler}>
          {monthsList.map((month, index) => (
            <MenuItem key={`m-${index}`} value={month}>
              {dayjs(month).format("MMMM")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectMonth;
