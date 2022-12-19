import React, { useState, useEffect } from "react";

import { Stack, Divider } from "@mui/material";

import dayjs from "dayjs";

import TravelsHeader from "./TravelsHeader/TravelsHeader";
import TravelsList from "./TravelsList/TravelsList";
import AddNewTravelForm from "./AddNewTravelForm/AddNewTravelForm";
import SelectPeriod from "./SelectPeriod/SelectPeriod";

const Travels = () => {
  const [travels, setTravels] = useState([]);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [month, setMonth] = useState(dayjs().format("MM"));

  const addTravelHandler = (newTravel) => {
    setTravels((prevTravels) => {
      const newArr = [+dayjs(newTravel), ...prevTravels];
      return newArr.sort((x, y) => y - x);
    });
  };

  const deleteTravelHandler = (timestamp) => {
    setTravels((prevTravels) => {
      console.log(prevTravels, timestamp);

      const newArr = [...prevTravels].filter((item) => item !== timestamp);

      console.log(newArr);

      return newArr;
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

  useEffect(() => {
    setYear(dayjs(travels[0]).format("YYYY"));
    setMonth(dayjs(travels[0]).format("MM"));
  }, [travels]);

  // Provide a list of years/months without duplicates
  const yearsList = [...new Set(travels.map((t) => dayjs(t).format("YYYY")))];
  const monthsList = [...new Set(travels.map((t) => dayjs(t).format("MM")))];

  const filteredTravels = travels.filter((t) => {
    return dayjs(t).format("YYYY") === year && dayjs(t).format("MM") === month;
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
    </Stack>
  );
};

export default Travels;
