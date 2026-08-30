const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Fix triple brace to double
build = build.replace('}}}\n};\n', '}}\n};\n');

fs.writeFileSync("build-guides.js", build, "utf8");

// Verify the area
const check=fs.readFileSync("build-guides.js","utf8");
const fnIdx=check.indexOf("function shopButtonsTest");
const before=check.slice(fnIdx-30, fnIdx+10);
console.log("Before function:", JSON.stringify(before));
