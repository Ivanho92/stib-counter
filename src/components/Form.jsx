import { useState, useContext } from "react";
import { TravelsContext } from "../store/travels-context";

import dayjs from "dayjs";
import { Box, TextField, Button, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./Form.module.css";

const dateTimeFormat = "DD/MM/YYYY - HH:mm";

const isDateValid = (dateTimeValue) => {
    if (!dateTimeValue || dateTimeValue.format(dateTimeFormat) === "Invalid Date") {
        return false;
    }

    return true;
};

const Form = () => {
    const { setTravelsList } = useContext(TravelsContext);

    const theme = useTheme();
    const matchesTabletSize = useMediaQuery(theme.breakpoints.up("tablet"));

    const [showManualInput, setShowManualInput] = useState(false);
    const [dateTimeValue, setDateTimeValue] = useState(null);
    const [dateTimeIsTouched, setDateTimeIsTouched] = useState(false);

    const dateTimeIsValid = isDateValid(dateTimeValue);

    const toggleManualInput = () => {
        setShowManualInput((prevState) => !prevState);
        resetForm();
    };

    const resetForm = () => {
        setDateTimeValue(null);
        setDateTimeIsTouched(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (showManualInput) {
            setDateTimeIsTouched(true);

            if (!dateTimeIsValid) {
                return;
            }
        }

        let value = dayjs();
        if (showManualInput) {
            value = dateTimeValue;
            resetForm();
        }

        setTravelsList((prevState) => [value.format(dateTimeFormat), ...prevState]);
    };

    const changeHandler = (newValue) => {
        setDateTimeValue(newValue);
    };

    const blurHandler = () => {
        if (!dateTimeIsTouched) {
            setDateTimeIsTouched(true);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: matchesTabletSize ? "row" : "column",
                // width: matchesTabletSize ? "auto" : "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                p: 2,
                backgroundColor: theme.palette.grey[100],
                borderRadius: "6px",
                flexWrap: "wrap",
                gap: "1rem",
            }}>
            {!showManualInput && (
                <Button type="submit" onClick={submitHandler} variant="contained" fullWidth={!matchesTabletSize}>
                    Add travel
                </Button>
            )}

            {showManualInput && (
                <Box
                    component="form"
                    noValidate
                    onSubmit={submitHandler}
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        width: matchesTabletSize ? "auto" : "100%",
                        flexDirection: matchesTabletSize ? "row" : "column",
                        // justifyContent: "space-between",
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            sx={{
                                width: matchesTabletSize ? "auto" : "100%",
                            }}>
                            <DateTimePicker
                                label="Select a date"
                                value={dateTimeValue}
                                inputFormat={dateTimeFormat}
                                ampm={false}
                                onChange={changeHandler}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth={!matchesTabletSize}
                                        onBlur={blurHandler}
                                        size="small"
                                        {...params}
                                        sx={{ backgroundColor: "white" }}
                                        error={!dateTimeIsValid && dateTimeIsTouched}
                                    />
                                )}
                                componentsProps={{
                                    actionBar: { actions: ["clear", "accept"] },
                                }}
                            />
                            {!dateTimeIsValid && dateTimeIsTouched && (
                                <Typography variant="body2" className={styles["error-text"]}>
                                    Date is not valid
                                </Typography>
                            )}
                        </Box>
                    </LocalizationProvider>

                    <Button type="submit" variant="contained" fullWidth={!matchesTabletSize}>
                        Add travel
                    </Button>
                </Box>
            )}

            <Button fullWidth={!matchesTabletSize} onClick={toggleManualInput}>
                {showManualInput ? "Close" : "Switch to Manual Mode"}
            </Button>
        </Box>
    );
};

export default Form;
