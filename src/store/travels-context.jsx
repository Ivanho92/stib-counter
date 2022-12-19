import React, { useEffect, useState } from "react";

export const TravelsContext = React.createContext();

const TravelsContextProvider = ({ children }) => {
  const [travelsList, setTravelsList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("travelsList");
    if (data) setTravelsList(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = JSON.stringify(travelsList);
    localStorage.setItem("travelsList", data);
  }, [travelsList]);

  // useEffect(() => {
  //   const months = dateObjects.map((item) => dayjs(item).format("MM"));
  //   setSelectedMonth(months[0]);
  //   setSelectMonths([...new Set(months)]);

  //   const years = dateObjects.map((item) => dayjs(item).format("YYYY"));
  //   setSelectedYear(years[0]);
  //   setSelectYears([...new Set(years)]);
  // }, [dateObjects]);

  const exportValues = {
    travelsList,
    setTravelsList,
    // dateObjects,
    // setDateObjects,
    // selectMonths,
    // selectYears,
    // selectedMonth,
    // selectedYear,
    // setSelectedMonth,
    // setSelectedYear,
  };

  return (
    <TravelsContext.Provider value={exportValues}>
      {children}
    </TravelsContext.Provider>
  );
};

export default TravelsContextProvider;
