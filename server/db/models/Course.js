const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
  name: {
    type: Sequelize.STRING,
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/course1.jpg'
  },
});

module.exports = Course;
