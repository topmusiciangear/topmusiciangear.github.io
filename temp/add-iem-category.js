const fs = require("fs");

const file = "js/constants.js";
const fileContent = fs.readFileSync(file, "utf8");

const newCategory = `,
  in_ear_monitors: { name: "In-Ear Monitors", icon: '<svg data-fa="ear" class="icon fa-solid fa-ear-listen" viewBox="0 0 640 512" width="1em" height="1em" fill="currentColor"><path d="M320 32C143.3 32 0 143.3 0 320c0 35.7 7.6 69.5 21.3 100.3L0 512l237.3-55.3c23.8 4.4 48.3 5.1 72.5 1.1C384.5 435.4 462.5 355.7 462.5 256c0-88.9-71.1-160.9-159.1-160c-15.9 0-31.2 2.3-46.5 6.7l48.7 11.2c16.1-6.5 33.2-8.5 50.8-8.5c42 0 76.5 34 76.5 76.5s-34 76.5-76.5 76.5c-24.9 0-47.4-11.2-62.8-29.3l-1.8 2.8c-6.1 6.1-15.1 7.1-22.9 2.5C202.8 419 156.7 384 96 384c-53 0-96-43-96-96s43-96 96-96c18.7 0 35.9 5.4 50.3 14.9l-25.4-5.8C305.5 162.6 258.9 128 192 128c-83.5 0-150.3 66.5-150.3 148.3c0 51.3 25.7 96.6 64.8 122.7L0 396.7c-6.1 1.6-10.1 8.7-9.4 14.8s8.7 10.1 14.8 9.4l193.1-44.9c21.6 4 43.7 5.5 65.8 4.1C459.9 505.1 512 432.8 512 416c0-79.1-57.6-143.8-135.3-155.8l-55.5-12.7c-17.3-3.7-32.7-11.7-45.2-23.8C409.3 283 384 256.5 384 224c0-85.6-67.6-155.2-151.7-155.1c-11.8.1-23.5 3.2-34.4 7.4l-44.3 10.1c-16.2 3.6-31.7 9.5-45.5 17.3C196.5 140.3 167.4 128 128 128c-83.5 0-150.3 66.5-150.3 148.3s66.5 148.3 148.3 148.3c50.7 0 95.7-24.9 122.5-63.1l-33.5 7.7C290.8 430.3 253.9 416 208 416c-54.5 0-99.8-37.2-115.3-88.4C66.8 229.4 32 192.2 32 152c0-54.7 41.3-103.1 96.1-112.5l55.5-12.7C159 21.6 133.1 11 96.8 10.7C38.5 10.4 8.2 48.5 8.3 84.2C8.4 136.3 51.5 178.4 128 192c46 0 86-22.4 109.6-58.1l33.5-7.7C349.2 71.7 386.1 38.8 416 15.7C437.5 5 467.5-6 512 5.3c41.7-.6 62.5 22.8 73.7 56.7l43.1 9.8C594.8 73.1 640 96.1 640 128c0 176.7-143.3 320-320 320z"/></svg>", desc: "Professional in-ear monitoring systems for stage and studio." }
`;

const searchStr = '  "drum-machine": { name: "Drum Machines"';
const replacement = newCategory + '  "drum-machine": { name: "Drum Machines"';

const fileContent = require("fs").readFileSync("js/constants.js", "utf8");
const newContent = fileContent.replace(searchStr, replacement);
require("fs").writeFileSync("js/constants.js", newContent);
console.log("DONE");