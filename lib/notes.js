const fs = require("fs");
const path = require("path");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFileSync);

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../data/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
}

function removeNote(deletedNote, notesArray) {
  const filteredNotes = notesArray.filter(notes => notes.id !== deletedNote);
  return filteredNotes;
}

function writeNotes(filteredNotes) {
  return writeFileAsync(
    path.join(__dirname, '../data/db.json'), 
    JSON.stringify({ notes: filteredNotes }, null, 2));
}

module.exports = {
    createNewNote,
    validateNote,
    removeNote,
    writeNotes
};