const fs=require("fs");
let build=fs.readFileSync("build-guides.js","utf8");

// Find the last entry and fix it
// Replace the trailing comma + empty line + function declaration
const lastEntryPattern = /\},\s*\n\r?\nfunction shopButtonsTest/;
build = build.replace(lastEntryPattern, '}}\n};\n\nfunction shopButtonsTest');

fs.writeFileSync("build-guides.js", build, "utf8");

// Verify
const check=fs.readFileSync("build-guides.js","utf8");
const fnIdx=check.indexOf("function shopButtonsTest");
const before=check.slice(fnIdx-30, fnIdx+10);
console.log("Before function:", JSON.stringify(before));
