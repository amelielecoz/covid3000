import { subDays } from "date-fns";

import hospitals_data from "../data/hospitals_data.json";

// return hospital data from a specific day
export const getHospitalsData = (day, sexeValue = 0, depValue = 0) => {
  let filtered_data;
  if (depValue === 0) {
    filtered_data = hospitals_data.filter(
      ({ jour, sexe }) => jour === day && sexe === sexeValue
    );
  } else {
    filtered_data = hospitals_data.filter(
      ({ jour, sexe, dep }) =>
        jour === day && sexe === sexeValue && dep === depValue
    );
  }
  // reducer to get a single object by adding all entries departement and sexes
  return filtered_data.reduce((acc, currentValue) => ({
    hosp: acc.hosp + currentValue.hosp,
    rea: acc.rea + currentValue.rea,
    rad: acc.rad + currentValue.rad,
    dc: acc.dc + currentValue.dc,
  }));
  // may return everything in this function to avoid to parse 2time or to use some memoize func?
};

// return an object which contains the delta between specified day and the day before
// this function may be included in getHospitalsData
export const getDeltaDayBefore = (day) => {
  const data_day = getHospitalsData(day);
  //TODO
};

// take a date with format like "2020-10-28" and return the last 10 days of data with 1 line per day
export const getHistory = (day, daysToHistory = 10, sexeValue = 0) => {
  const dayDate = new Date(day);
  const subDate = subDays(dayDate, daysToHistory);
  const filtered_data = hospitals_data.filter(
    ({ jour, sexe }) =>
      sexe === sexeValue &&
      new Date(jour) >= subDate &&
      new Date(jour) <= dayDate
  );
  const unsorted_data = filtered_data.reduce((historyList, currentValue) => {
    if (!historyList.find((element) => element.jour === currentValue.jour))
      return [
        ...historyList,
        {
          jour: currentValue.jour,
          hosp: currentValue.hosp,
          rea: currentValue.rea,
          dc: currentValue.dc,
          rad: currentValue.rad,
        },
      ];
    else
      return historyList.map((element) => {
        if (element.jour === currentValue.jour) {
          return {
            jour: element.jour,
            hosp: element.hosp + currentValue.hosp,
            rea: element.rea + currentValue.rea,
            dc: element.dc + currentValue.dc,
            rad: element.rad + currentValue.rad,
          };
        } else return element;
      });
  }, []);
  // todo sort data ? (for now it's older -> recent)
  return unsorted_data.reverse();
};
