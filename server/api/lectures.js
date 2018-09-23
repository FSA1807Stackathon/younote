const router = require('express').Router();
const {Lecture, Note} = require('../db/models');
module.exports = router;

// GET
router.get('/:lectureId', async(req, res, next) => {
  try{
    const lectureId = req.params.lectureId;

    // get a Lecture instance including a list of associated Notes instances.
    const lecture = await Lecture.findById(lectureId, {include: [Note]});

    if(!lecture){
      res.status(404).send('Lecture Not Found');
      return;
    }

    // sort notes
    lecture.notes.sort((note1, note2) => note1.createdAt > note2.createdAt);
    res.json(lecture);
  }catch(err){
    next(err);
  }
});

// POST
router.post('/', async(req, res, next) => {
  try{
    const {title, youtube_key, note, userId, courseId} = req.body;

    let lecture = await Lecture.findOne({
      where: {
        youtube_key: getYouTubeKey(youtube_key),
        userId
      }
    });

    if(lecture){
      console.log(`There is already a lecture with the same youtube_key created by the current user`);
    }else{
      lecture = await Lecture.create(
        {
          title,
          note,
          userId,
          courseId,
          youtube_key: getYouTubeKey(youtube_key)
        }
      );
    }

    res.json(lecture);
  }catch(err){
    next(err);
  }
});

// PUT
router.put('/:lectureId', async(req, res, next) => {
  const lectureId = req.params.lectureId;

  try{
    if(!req.user || !req.user.admin){
      res.status(403).send('Forbidden');
    }

    const lectureBody = {
      name: req.body.title,
      youtube_key: getYouTubeKey(req.body.youtube_key),
      note: req.body.note,
      userId: req.body.userId,
      courseId: req.body.courseId,
    }

    const tempLecture = await Lecture.findById(lectureId);
    if(!tempLecture){
      res.status(404).send();
      return;
    }

    if(req.user.admin || req.user.id === req.tempLecture.userId){
      const lecture = await Lecture.update(lectureBody, {
        where: {
          id: req.params.lecture,
        },
        returning: true,
      });

      if(!lecture){
        res.status(404).send('Course Not Found');
        return;
      }else{
        res.json(lecture);
      }
    }
  }catch(err){
    next(err);
  }
});

// DELETE
router.delete('/lectures/:lectureId', async (req, res, next) => {
  const lectureId = req.params.lectureId;
  try{
    const lecture = await Lecture.findById(lectureId);
    if(!lecture){
      res.status(404).send("Lecture Not Found");
      return;
    }

    if(!req.user.admin && req.user.id !== lecture.userId){
      res.status(403).send('Forbidden');
      return;
    }

    await Lecture.destroy({
      where: {id: lectureId}
    });

    // delete all the associated Note instances
    await Note.destroy({
      where: {lectureId}
    });

    res.status(201).send();
  }catch(err){
    next(err);
  }
});

function getYouTubeKey(url){
  let splitted = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(splitted[2] === undefined){
    return url;
  }

  return splitted[2].split(/[^0-9a-z_\-]/i)[0];
}
