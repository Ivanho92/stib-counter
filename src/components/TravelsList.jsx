import React, { useContext } from "react";
import { TravelsContext } from "../store/travels-context";

import { Box, Chip, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Paper from '@mui/material/Paper'

const TravelsList = () => {
    const { travelsList, setTravelsList } = useContext(TravelsContext);

    const deleteHandler = (index) => {
        setTravelsList((prevState) => {
            const newArr = [...prevState];
            newArr.splice(index, 1);
            return newArr;
        });
    };

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h2" sx={{ fontSize: "1.953rem" }}>
                    Travels
                </Typography>
                <Box display="flex" gap={1} alignItems="center">
                    <Typography variant="body1">Total : </Typography>
                    <Chip label={`${travelsList.length}`} />
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        {travelsList.map((row, index) => (
                            <TableRow hover key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
