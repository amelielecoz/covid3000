import React, { useState } from "react";
import FiltersContext from "./filtersContext";

const FiltersState = (props) => {
  const [sexe, setSexe] = useState(0); // default 0 = all
  const [departement, setDepartement] = useState("tous"); // default "tous"
  const [startDate, setStartDate] = useState(new Date());

  return (
    <FiltersContext.Provider
      value={{
        sexe,
        setSexe,
        departement,
        setDepartement,
        startDate,
        setStartDate,
      }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
};

export default FiltersState;
