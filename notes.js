
const fs = require('fs');

var fetchNotes = () => {
  try { // skip read if file doesn't exist
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
    } catch (e) {
      return [];
    }
};


var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
    };

  var duplicateNotes = notes.filter((note) => note.title === title); //parses array and only keeps item if true is retuned.

  if (duplicateNotes.length === 0) {
    notes.push(note); //add to end of array
    saveNotes(notes);
    return note;
    }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  //fetch
  var notes = fetchNotes();
  //filter noteString
  filterdNotes = notes.filter((note) => note.title === title);
    //if different return true
  return filterdNotes[0];
};

var removeNote = (title) => {
  //fetch
  var notes = fetchNotes();
  //filter noteString
  filterdNotes = notes.filter((note) => note.title !== title);
  //save notes to json
  saveNotes(notes);
  //if different return true
  return notes.length !== filterdNotes.length;
};
var logNote = (note) => {
  debugger;
    console.log('---');
    console.log(`Note Title: ${note.title}`);
    console.log(`Note Body: ${note.body}`);
  }

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
