import { useState, useContext } from "react";
import { TravelsContext } from "../store/travels-context";

import dayjs from "dayjs";
import { Box, TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useTheme } from '@mui/material/styles';

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

    console.log(theme);

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
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let value = dayjs();
        if (showManualInput && dateTimeIsValid) {
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
                justifyContent: "space-between",
                alignItems: "flex-start",
                p: 2,
                backgroundColor: theme.palette.grey[100],
                borderRadius: "6px",
            }}>
            {!showManualInput && (
                <Button type="submit" onClick={submitHandler} variant="contained">
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
                        justifyContent: "space-between",
                        gap: "1rem",
                        alignItems: "start",
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Travel date"
                            value={dateTimeValue}
                            inputFormat={dateTimeFormat}
                            ampm={false}
                            onChange={changeHandler}
                            renderInput={(params) => (
                                <TextField
                                    onBlur={blurHandler}
                                    size="small"
                                    {...params}
                                    error={!dateTimeIsValid && dateTimeIsTouched}
                                    helperText={!dateTimeIsValid && dateTimeIsTouched && "Date is not valid"}
                                />
                            )}
                            componentsProps={{
                                actionBar: { actions: ["clear", "today"] },
                            }}
                        />
                    </LocalizationProvider>

                    <Button type="submit" variant="contained">
                        Add travel
                    </Button>
                </Box>
            )}

            <Button onClick={toggleManualInput}>{showManualInput ? "Close" : "Enter a manual date"}</Button>
        </Box>
    );
};

export default Form;
