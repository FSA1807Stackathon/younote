const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
  note: {
    type: Sequelize.STRING,
  },
  timestamp: {
    type: Sequelize.DATE
  }
});

module.exports = Note;
