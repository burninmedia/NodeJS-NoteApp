console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions =  {
    describe: 'title of note',
    demand: true,
    alias: 't'
  }
const bodyOptions = {
  describe: 'body of the note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add','Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
      title: titleOptions
    })
    .command('remove','Remove a note', {
      title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created.')
    notes.logNote;
  } else {
    console.log('Note title already in use')
};
}
else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    notes.logNote;
  } else {
    console.log('Note not found')
  };
}
else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Pringing ${allNotes.length} notes(s).`);
  allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title)
    var message = noteRemoved ? 'Note was removed' : 'Note NOT found'
    console.log(message)

}
else {
    console.log('Command not recognized');
}
