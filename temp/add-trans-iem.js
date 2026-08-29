const fs=require("fs");
const file="js/translations.js";
let t=fs.readFileSync(file,"utf8");

t=t.replace(
  `navMonitors: "Monitors",`,
  `navMonitors: "Monitors",\n    navInEarMonitors: "In-Ear Monitors",`
).replace(
  `navMonitors: "Monitores",`,
  `navMonitors: "Monitores",\n    navInEarMonitors: "Monitores In-Ear",`
);

fs.writeFileSync(file, t);
console.log("DONE - added translation");
