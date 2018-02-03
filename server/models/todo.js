var mongoose = require('../db/mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Date
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Todo;
