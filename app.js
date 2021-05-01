//jshint esversion:6

const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

//costumize yargs version
yargs.version("1.1.0");

//Setting up the adding note command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    //Adding another argument to your add command
    title: {
      describe: "This is your note title",
      demandOption: true, //This always make sure the title command is typed
      type: "string", //This makes sure the type of the title command always returns string
    },
    body: {
      describe: "This is the body of your note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

//Removing a note
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Use this to remove a note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//listing all notes
yargs.command({
  command: "list",
  describe: "Listing all notes",
  handler() {
    notes.listNotes();
  },
});

//reading a note
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "This is the title of the name you want to read",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
