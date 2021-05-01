//jshint esversion: 6
const chalk = require("chalk");
const fs = require("fs");
const log = console.log;

const readNote = (title) => {
  notes = loadNotes();

  const matchedNote = notes.find((note) => note.title === title);

  if (matchedNote) {
    log(chalk.green("title:" + matchedNote.title));
    log("body: " + matchedNote.body);
  } else {
    log(chalk.red.inverse("No match found!!!"));
  }
};

const addNotes = (title, body) => {
  //Add Note to the existing array
  const notes = loadNotes();

  //Check to see if note is not duplicated
  const duplicatedNote = notes.find((note) => note.title === title);
  //find() ==> returns the first match if condition return to true from a list of array
  // filter() ==> returns a list of all match whenever the condition returns true and it search through the whole array list.

  debugger
  if (!duplicatedNote) {
    notes.push({
      title: title,
      body: body,
    });

    //Saving the note created to file
    savedNotes(notes);
    log(chalk.white.bgGreen("Note saved"));
  } else {
    log(chalk.white.bgRed("Note is already in existence!!!"));
  }
};

//Function that saves a note
const removeNote = (title) => {
  //Load the whole notes
  const notes = loadNotes();
  //Check to see if the title is contained in the notes array
  const notesToKeep = notes.filter(
    (note) => note.title.toLowerCase() !== title.toLowerCase()
  );

  if (notes.length > notesToKeep.length) {
    log(chalk.bgWhite.green.inverse("Note Removed"));
    savedNotes(notesToKeep);
  } else {
    log(chalk.white.bgRed("No Note Found!!!"));
  }
};

const listNotes = () => {
  log(chalk.green("Your Notes..."));
  const notes = loadNotes();

  notes.forEach((note) => {
    log(chalk.white(note.title) + " : " + chalk.yellow(note.body));
  });
};

const loadNotes = () => {
  try {
    const noteBuffer = fs.readFileSync("notes.json");
    const noteJSON = noteBuffer.toString();
    return JSON.parse(noteJSON);
  } catch (e) {
    return [];
  }
};

const savedNotes = (notes) => {
  const noteJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", noteJSON);
};

module.exports = {
  readNote: readNote,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
};
