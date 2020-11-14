const router = require('express').Router();
const { createNewNote, validateNote, removeNote, writeNotes } = require('../../lib/notes');
const { notes } = require('../../data/db');

router.get('/notes', (req, res) => {
  let result = [];
  result = notes;
  return res.json(result);
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
  const deletedNote = req.params.id;
  const filteredNotes = removeNote(deletedNote, notes);
  setTimeout(function() {
    return writeNotes(filteredNotes)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  }, 100);
});

module.exports  = router;