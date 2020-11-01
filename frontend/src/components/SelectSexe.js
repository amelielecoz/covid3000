import React, { useContext } from "react";
import FiltersContext from "../context/filtersContext";

const FilterSelect = () => {
  const { setSexe } = useContext(FiltersContext);

  const handleChangeSexe = (e) => {
    console.log("handleChangeSexe");
    switch (e.target.value) {
      case "hommes":
        console.log("hommes");
        setSexe(1);
        break;
      case "femmes":
        console.log("femmes");
        setSexe(2);
        break;
      default:
        setSexe(0);
    }
  };

  return (
    <div className="ml-4">
      <label htmlFor="sexe">Sexe</label>
      <div className="inline-block relative w-20 ml-1">
        <select
          onChange={handleChangeSexe}
          name="sexe"
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="tous">Tous</option>
          <option value="hommes">Hommes</option>
          <option value="femmes">Femmes</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterSelect;
