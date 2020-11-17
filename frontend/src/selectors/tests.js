export const getTestsData = (
  tests_data,
  startDate,
  endDate,
  depValue = "tous"
) => {
  const filtered_data = tests_data.filter(
    ({ jour, dep }) =>
      (depValue === "tous" || dep.toString() === depValue) &&
      new Date(jour) >= startDate &&
      new Date(jour) <= endDate
  );

  return filtered_data.reduce((list, { dep, jour, P, T }) => {
    if (!list.find((element) => element.jour === jour))
      return [
        ...list,
        {
          jour,
          dep,
          P,
          T,
        },
      ];
    else
      return list.map((element) => {
        if (element.jour === jour) {
          return {
            jour,
            T: element.T + T,
            P: element.P + P,
          };
        } else return element;
      });
  }, []);
};
