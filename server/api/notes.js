const router = require('express').Router();
const {Note} = require('../db/models');
module.exports = router;

// POST
router.post('/', async(req, res, next) => {
  try{
    const {note_text, lectureId, player_head_pos} = req.body;

    const note = await Note.create({
      note: note_text,
      lectureId: lectureId,
      player_head_pos: player_head_pos
    });

    res.json(note);
  }catch(err){
    next(err);
  }
});

// DELETE
router.delete('/:noteId', async(req, res, next) => {
  try{
    const noteId = req.params.noteId;

    await Note.destroy({
      where: {id: noteId}
    })

    res.status(201).send();
  }catch(err){
    next(err);
  }
});
