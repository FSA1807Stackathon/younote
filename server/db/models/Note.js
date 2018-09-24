const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
  note: {
    type: Sequelize.TEXT,
  },
  player_head_pos: {
    type: Sequelize.INTEGER // save a player head pos in seconds
  }
});

module.exports = Note;
