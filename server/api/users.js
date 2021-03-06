const router = require('express').Router()
const {User, Course, Lecture, Note} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    // only admin or logged-in user can get this api route result.
    if (!req.user || !req.user.admin) {
      res.status(403).send('Forbidden')
      return;
    }

    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err)
  }
});

// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try{
    // only logged-in admin or its own user can get the result of this api route.
    if (
      !req.user ||
      !req.user.admin ||
      req.user.id !== Number(userId)
    ) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.findById(userId);
    // in case user is not, found send back 404 with a message.
    if(!user){
      res.status(404).send("User Not Found");
      return;
    }

    res.json(user);
  }catch(err){
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try{
    if(req.user && !req.user.admin){
      // only logged-out user or admin can create a new user
      res.status(403).send('Forbidden')
      return
    }

    // Note that in the User db definition, duplicate email is not allowed.
    const {email, password, googleId} = req.body;

    let admin = false
    if (req.user && req.user.admin) {
      admin = req.body.admin
    }

    const userBody = {
      email,
      password,
      googleId,
      admin,
    }

    const user = await User.create(userBody)
    res.json(user)
  }catch(err){
    next(err);
  }
});

router.put('/:userId', async (req, res, next) => {
  try{
    const userId = req.params.userId;

    // Note that only either admin or the account holder is allowed to update the user account.
    if (!req.user || !req.user.admin || req.user.id !== Number(userId)) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.update(req.body, {
      where: {
        id: userId,
      },
      returning: true
    });

    if (!user) {
      res.status(404).send('User Not Found');
      return;
    }

    res.json(user)
  }catch(err){
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try{
    // For now, this route is not availble.
    // await User.destroy({
    //  where: {
    //   id: req.params.userId,
    //  }
    // });
  }catch(err){
    next(err);
  }
});

// GET /api/users/:userId/courses - getting all the list of courses of this user(userId)
router.get('/:userId/courses', async (req, res, next) => {
  const userId = req.params.userId;
  try{
    // only logged-in admin or its own user can get the result of this api route.
    if (
      !req.user || (!req.user.admin && req.user.id !== Number(userId))
    ) {
      res.status(403).send('Forbidden')
      return
    }

    const user = await User.findById(userId, {include: [Course]});
    // in case user is not, found send back 404 with a message.
    if(!user){
      res.status(404).send("User Not Found");
      return;
    }

    user.courses.sort((course1, course2) => course1.createdAt < course2.createdAt);
    res.json(user);
  }catch(err){
    next(err);
  }
});

// GET /api/users/:userId/courses/:courseId - getting a class of this user(userId) including all the lectures associated with the courses
router.get('/:userId/courses/:courseId', async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    if(!user){
      res.status(404).send('User Not Found');
      return;
    }

    const course = await Course.findOne({
      where: {
        id: courseId,
        userId: userId,
      },
      include: [Lecture]
    });

    if(!course){
      res.status(404).send('Course Not Found');
      return;
    }

    course.lectures.sort((lecture1, lecture2) => lecture1.createdAt < lecture2.createdAt);
    res.json(course);
  }catch(err){
    next(err);
  }
});

router.get('/:userId/courses/:courseId/lectures/', async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    if(!user){
      res.status(404).send('User Not Found');
      return;
    }

    const course = await Course.findOne({
      where: {
        id: courseId,
        userId: userId,
      }
    });

    if(!course){
      res.status(404).send('Course Not Found');
      return;
    }

    const lectures = await Lecture.findAll(
      {
        where: {
          userId: userId,
          courseId: courseId,
        }
      }
    );

    if(!lectures){
      res.status(404).send('Lectures Not Found');
      return;
    }

    res.json(lectures);
  }catch(err){
    next(err);
  }
});

router.get('/:userId/courses/:courseId/lectures/:lectureId', async (req, res, next) => {
  try{
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const lectureId = req.params.lectureId;

    const user = await User.findById(userId);
    if(!user){
      res.status(404).send('User Not Found');
      return;
    }

    const course = await Course.findOne({
      where: {
        id: courseId,
        userId: userId,
      }
    });

    if(!course){
      res.status(404).send('Course Not Found');
      return;
    }

    const lecture = await Lecture.findOne(
      {
        where: {
          id: lectureId,
          userId: userId,
          courseId: courseId,
        },
        include: [Note],
      }
    );

    if(!lecture){
      res.status(404).send('Lecture Not Found');
      return;
    }

    lecture.notes.sort((note1, note2) => note1.createdAt < note2.createdAt);
    res.json(lecture);
  }catch(err){
    next(err);
  }
});
