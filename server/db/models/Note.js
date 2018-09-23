const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
  note: {
    type: Sequelize.STRING,
  },
  player_head_pos: {
    type: Sequelize.DATE
  }
});

module.exports = Note;
