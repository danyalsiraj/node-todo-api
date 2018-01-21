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
  }
});

module.exports = Todo;
