import React, { useState } from "react";
import FiltersContext from "./filtersContext";

const FiltersState = (props) => {
  const [sexe, setSexe] = useState(0); // default 0 = all
  const [departement, setDepartement] = useState(0); // default 0 = all

  return (
    <FiltersContext.Provider
      value={{ sexe, setSexe, departement, setDepartement }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
};

export default FiltersState;
