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

  const addTravelHandler = (newTravel) => {
    setTravels((prevTravels) => {
      const newArr = [+dayjs(newTravel), ...prevTravels];
      return newArr.sort((x, y) => y - x);
    });
  };

  const deleteTravelHandler = (index) => {
    setTravels((prevTravels) => {
      const newArr = [...prevTravels];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const yearChangeHandler = (newYearValue) => setYear(newYearValue);

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
  }, [travels]);

  // Provide a list of years without duplicates
  const yearsList = [...new Set(travels.map((t) => dayjs(t).format("YYYY")))];

  const filteredTravels = travels.filter((t) => {
    return dayjs(t).format("YYYY") === year;
  });

  return (
    <Stack spacing={2}>
      <AddNewTravelForm onAddNewTravel={addTravelHandler} />
      <Divider />
      <TravelsHeader itemsTotal={filteredTravels.length} />
      <SelectPeriod
        year={year}
        yearsList={yearsList}
        onYearChange={yearChangeHandler}
      />
      <TravelsList items={filteredTravels} onDeleteTravel={deleteTravelHandler} />
    </Stack>
  );
};

export default Travels;
