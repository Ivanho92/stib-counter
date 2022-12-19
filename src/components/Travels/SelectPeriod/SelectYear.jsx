import React from "react";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectYear = ({ fullWidth, year, onYearChange, yearsList }) => {
  const yearChangeHandler = (e) => {
    onYearChange(e.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id="select-year-label">Year</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year"
          value={year}
          label="Year"
          onChange={yearChangeHandler}>
          {yearsList.map((year, index) => (
            <MenuItem key={`y-${index}`} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectYear;
