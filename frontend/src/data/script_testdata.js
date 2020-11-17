const tests_data = require("./tests_data_downloaded.json");
const fs = require("fs");

const data = tests_data.reduce((list, { dep, jour, P, T }) => {
  if (list.find((element) => element.jour === jour && element.dep === dep)) {
    console.log("found, adding data");
    return list.map((element) => {
      if (element.jour === jour && element.dep === dep) {
        return {
          jour: element.jour,
          dep: element.dep,
          P: element.P + P,
          T: element.T + T,
        };
      } else return element;
    });
  } else {
    console.log("not found, creating data");
    return [...list, { dep, jour, P, T }];
  }
}, []);

fs.writeFile("./tests_data.json", JSON.stringify(data), (err) => {
  if (err) throw err;
  console.log("Done writin'");
});
