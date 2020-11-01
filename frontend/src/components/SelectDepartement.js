import React, { useContext } from "react";

import FiltersContext from "../context/filtersContext";
import list_dept_regions from "../data/depts_regions_france.json";

const SelectDepartement = () => {
  const { setDepartement } = useContext(FiltersContext);
  return (
    <div className="ml-4">
      <label htmlFor="dept">Dept.</label>
      <div className="inline-block relative w-20 ml-1">
        <select
          onChange={(e) => setDepartement(e.target.value)}
          name="dept"
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="tous">Tous</option>
          {list_dept_regions.map(({ departmentCode }) => (
            <option key={departmentCode} value={departmentCode}>
              {departmentCode}
            </option>
          ))}
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

export default SelectDepartement;

/* <div className="ml-4">
  <input type="text" list="dept" value={departement} />
  <datalist id="dept">
    {list_dept_regions.map(({ departmentCode }) => (
      <option>{departmentCode}</option>
    ))}
  </datalist>
</div>; */
