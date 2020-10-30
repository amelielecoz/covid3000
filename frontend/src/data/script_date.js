const fs = require("fs");
const hospitals_data = require("./hospitals_data.json");

const data = hospitals_data.map((entry) => ({
  ...entry,
  jour: new Date(entry.jour).getTime(),
}));

fs.writeFile("hosp_data_processed.json", JSON.stringify(data), (err) => {
  if (err) throw err;
  console.log("Done writing");
});
