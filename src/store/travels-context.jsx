import React, { useEffect, useState } from "react";

export const TravelsContext = React.createContext();

const TravelsContextProvider = ({ children }) => {
    const [travelsList, setTravelsList] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem("travelsList");

        if (data) {
            setTravelsList(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        const data = JSON.stringify(travelsList);
        
        localStorage.setItem("travelsList", data);
    }, [travelsList]);

    const exportValues = {
        travelsList,
        setTravelsList,
    };

    return <TravelsContext.Provider value={exportValues}>{children}</TravelsContext.Provider>;
};

export default TravelsContextProvider;
