import React from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import dayjs from "dayjs";

const TravelsList = ({ items, onDeleteTravel }) => {
  const deleteHandler = (timestamp) => {
    onDeleteTravel(timestamp);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {items.map((row, index) => (
              <TableRow
                hover
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell scope="row">
                  {dayjs(row).format("DD/MM/YYYY - HH:mm")}
                </TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={() => deleteHandler(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {items.length === 0 && (
        <Typography align="center">No travels found :(</Typography>
      )}
    </>
  );
};

export default TravelsList;
