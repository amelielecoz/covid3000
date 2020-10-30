import hospitals_data from "../data/hospitals_data.json";

// return hospital data from a specific day
export const getHospitalsData = (day) => {
  const filtered_data = hospitals_data.filter(
    ({ jour, sexe }) => jour === day && sexe === 0
  );
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
export const getDeltaDayBefore = (day) => {
  const data_day = getHospitalsData(day);
  //TODO
};

export const getHistory = (day, numberDays = 10) => {
  // get the last 10 days of data
};
