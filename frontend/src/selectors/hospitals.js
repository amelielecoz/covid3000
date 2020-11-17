import { subDays } from "date-fns";

//import hospitals_data from "../data/hospitals_data.json";

// return hospital data from a specific day
// export const getHospitalsData = (
//   hospitals_data,
//   day,
//   sexeValue = 0,
//   depValue = "tous"
// ) => {
//   let filtered_data;
//   if (depValue === "tous") {
//     filtered_data = hospitals_data.filter(
//       ({ jour, sexe }) => jour === day && sexe === sexeValue
//     );
//   } else {
//     filtered_data = hospitals_data.filter(
//       ({ jour, sexe, dep }) =>
//         jour === day && sexe === sexeValue && dep.toString() === depValue
//     );
//   }
//   // reducer to get a single object by adding all entries departement and sexes
//   return filtered_data.reduce((acc, currentValue) => ({
//     hosp: acc.hosp + currentValue.hosp,
//     rea: acc.rea + currentValue.rea,
//     rad: acc.rad + currentValue.rad,
//     dc: acc.dc + currentValue.dc,
//   }));
//   // may return everything in this function to avoid to parse 2time or to use some memoize func?
// };

// take a date with format like "2020-10-28" and return the last 10 days of data with 1 line per day
export const getHistory = (
  hospitals_data,
  startDate,
  endDate,
  sexeValue = 0,
  depValue = "tous"
) => {
  //const subDate = subDays(endDate, daysToHistory);

  const filtered_data = hospitals_data.filter(
    ({ jour, sexe, dep }) =>
      sexe === sexeValue &&
      (depValue === "tous" || dep.toString() === depValue) &&
      new Date(jour) >= startDate &&
      new Date(jour) <= endDate
  );
  return filtered_data.reduce((historyList, currentValue) => {
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
};
