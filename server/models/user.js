var mongoose = require('../db/mongoose');

var User = mongoose.model('Users', {
  email: {
    trim: true,
    required: true,
    minlength: 1,
    type: String
  }
});

module.exports = User;
