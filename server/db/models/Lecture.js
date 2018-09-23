const Sequelize = require('sequelize')
const db = require('../db')

const Lecture = db.define('lecture', {
  title:{
    type: Sequelize.STRING,
  },
  youtube_key:{
    type: Sequelize.STRING,
  },
});

module.exports = Lecture;
