import React, { useContext, useState } from "react";
import { TravelsContext } from "../store/travels-context";
import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";

import dayjs from "dayjs";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Box,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const TravelsList = () => {
  const { travelsList, setTravelsList } = useContext(TravelsContext);

  const monthsList = [
    ...new Set(
      travelsList.map((item) => dayjs(item, "DD/MM/YYYY - HH:mm").format("MM")),
    ),
  ];

  const yearsList = [
    ...new Set(
      travelsList.map((item) => dayjs(item, "DD/MM/YYYY - HH:mm").format("YYYY")),
    ),
  ];

  const [filterYear, setFilterYear] = useState(dayjs().format("YYYY"));
  const [filterMonth, setFilterMonth] = useState(dayjs().format("MM"));

  const theme = useTheme();
  const matchesTabletSize = useMediaQuery(theme.breakpoints.up("tablet"));

  const deleteHandler = (index) => {
    setTravelsList((prevState) => {
      const newArr = [...prevState];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const filteredTravelsList = travelsList.filter((item) => {
    const itemDateObj = dayjs(item, "DD/MM/YYYY - HH:mm");
    const itemMonth = dayjs(itemDateObj).format("MM");
    const itemYear = dayjs(itemDateObj).format("YYYY");
    return itemMonth === filterMonth && itemYear === filterYear;
  });

  console.log("travelsList", travelsList);
  console.log("monthsList", monthsList);
  console.log("yearsList", yearsList);
  console.log("filterMonth", filterMonth);
  console.log("filterYear", filterYear);
  console.log("filteredTravelsList", filteredTravelsList);

  const changeMonth = (value) => {
    setFilterMonth(value);
  };

  const changeYear = (value) => {
    setFilterYear(value);
  };

  return (
    <React.Fragment>
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
            label={`${travelsList.length}`}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          flexDirection: matchesTabletSize ? "row" : "column",
        }}>
        <SelectMonth
          fullWidth={!matchesTabletSize}
          month={filterMonth}
          onMonthChange={changeMonth}
          monthsList={monthsList}
        />
        <SelectYear
          fullWidth={!matchesTabletSize}
          year={filterYear}
          onYearChange={changeYear}
          yearsList={yearsList}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {filteredTravelsList.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">{row}</TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={() => deleteHandler(index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default TravelsList;
