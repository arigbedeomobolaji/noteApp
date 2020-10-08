const fs = require("fs");

const getNotes = function (fileName, notes) {
  fs.writeFileSync(fileName + ".txt", notes);
  return "File was successfully Created";
};

module.exports = getNotes;
