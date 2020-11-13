const fs = require("fs");
const path = require("path");

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

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
    if (!note.body || typeof note.body !== 'string') {
      return false;
    }
    return true;
}

module.exports = {
    findById,
    createNewNote,
    validateNote
};