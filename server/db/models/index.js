const User = require('./User');
const Course = require('./Course');
const Lecture = require('./Lecture');
const Note = require('./Note');

/**
 * Associations
 */
Course.belongsTo(User);
User.hasMany(Course);
Lecture.belongsTo(User, {through: Course});
Course.hasMany(Lecture);
Note.belongsTo(Lecture);
Lecture.hasMany(Note);

module.exports = {
  User,
  Course,
  Lecture,
  Note,
}
