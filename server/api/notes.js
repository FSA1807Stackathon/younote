const router = require('express').Router();
const {Note} = require('../db/models');
module.exports = router;

// POST
router.post('/', async(req, res, next) => {
  try{
    const {note, lectureId, player_head_pos} = req.body;

    const noteCreated = await Note.create({
      note: note,
      lectureId: lectureId,
      player_head_pos: player_head_pos
    });

    res.json(noteCreated);
  }catch(err){
    next(err);
  }
});

// PUT
router.put('/:noteId', async(req, res, next) => {
  try{
    const {noteText} = req.body;

    const noteUpdated = await Note.update({note: noteText}, {
      where: {
        id: req.params.noteId,
      },
      returning: true,
    });

    req.json(noteUpdated);
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
