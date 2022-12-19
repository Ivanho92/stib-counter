import React, { useContext } from "react";
import { TravelsContext } from "../store/travels-context";

import dayjs from "dayjs";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectYear = ({ fullWidth }) => {
  const { dateObjects } = useContext(TravelsContext);

  const years = dateObjects.map((item) => dayjs(item).format("YYYY"));
  const uniqueYears = [...new Set(years)];

  return (
    <Box>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id="select-year-label">Year</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year"
          value={dayjs(dateObjects[0]).format("YYYY")}
          label="Year"
          onChange={() => {}}>
          {uniqueYears.map((year, index) => (
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
