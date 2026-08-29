const fs=require("fs");
const file="index.html";
let html=fs.readFileSync(file,"utf8");

// Add in_ear_monitors to the footer category nav (after monitors)
html=html.replace(
  `<li><a href="#" onclick="event.preventDefault();window.filterCategory('monitors')" data-i18n="navMonitors">Monitors</a></li>`,
  `<li><a href="#" onclick="event.preventDefault();window.filterCategory('monitors')" data-i18n="navMonitors">Monitors</a></li>
          <li><a href="#" onclick="event.preventDefault();window.filterCategory('in_ear_monitors')" data-i18n="navInEarMonitors">In-Ear Monitors</a></li>`
);

fs.writeFileSync(file, html);
console.log("DONE - added in_ear_monitors to nav");
