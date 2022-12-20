import React, { useState, useEffect } from "react";

import { Stack, Divider } from "@mui/material";

import dayjs from "dayjs";

import TravelsHeader from "./TravelsHeader/TravelsHeader";
import TravelsList from "./TravelsList/TravelsList";
import AddNewTravelForm from "./AddNewTravelForm/AddNewTravelForm";
import SelectPeriod from "./SelectPeriod/SelectPeriod";
import Popup from "../common/Popup";

import Transition from "react-transition-group/Transition";

const getYear = (timestamp) => dayjs(timestamp).format("YYYY");
const getMonth = (timestamp) => dayjs(timestamp).format("MM");

const Travels = () => {
  const [travels, setTravels] = useState([]);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [month, setMonth] = useState(dayjs().format("MM"));

  const [showConfirmation, setShowConfirmation] = useState({ show: false });

  const addTravelHandler = (newTravel) => {
    setTravels((prevTravels) => {
      const newArr = [+dayjs(newTravel), ...prevTravels];
      return newArr.sort((x, y) => y - x);
    });

    setYear(getYear(newTravel));
    setMonth(getMonth(newTravel));
    setShowConfirmation({
      show: true,
      status: "success",
      message: "Successfully added ✔",
    });
  };

  const deleteTravelHandler = (timestamp) => {
    setTravels((prevTravels) => {
      const newArr = [...prevTravels].filter((item) => item !== timestamp);

      if (
        !newArr.find(
          (item) =>
            getYear(item) === getYear(timestamp) &&
            getMonth(item) === getMonth(timestamp),
        )
      ) {
        setYear(getYear(newArr[0]));
        setMonth(getMonth(newArr[0]));
      }

      return newArr;
    });

    setShowConfirmation({
      show: true,
      status: "success",
      message: "Successfully deleted ✔",
    });
  };

  const yearChangeHandler = (newYearValue) => setYear(newYearValue);
  const monthChangeHandler = (newMonthValue) => setMonth(newMonthValue);

  useEffect(() => {
    const data = localStorage.getItem("travelsList");
    if (data) setTravels(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = JSON.stringify(travels);
    localStorage.setItem("travelsList", data);
  }, [travels]);

  // Provide a list of years/months without duplicates
  const yearsList = [...new Set(travels.map((t) => getYear(t)))];
  const monthsList = [...new Set(travels.map((t) => getMonth(t)))];

  const filteredTravels = travels.filter((t) => {
    return getYear(t) === year && getMonth(t) === month;
  });

  return (
    <Stack spacing={3}>
      <AddNewTravelForm onAddNewTravel={addTravelHandler} />
      <Divider />
      <TravelsHeader itemsTotal={filteredTravels.length} />
      <SelectPeriod
        year={year}
        yearsList={yearsList}
        onYearChange={yearChangeHandler}
        month={month}
        monthsList={monthsList}
        onMonthChange={monthChangeHandler}
      />
      <TravelsList items={filteredTravels} onDeleteTravel={deleteTravelHandler} />
      <Transition
        mountOnEnter
        unmountOnExit
        in={showConfirmation.show}
        timeout={200}>
        {(state) => (
          <Popup
            transitionState={state}
            status={showConfirmation.status}
            message={showConfirmation.message}
            onPopupClose={() =>
              setShowConfirmation((prevState) => ({ ...prevState, show: false }))
            }
          />
        )}
      </Transition>
    </Stack>
  );
};

export default Travels;
