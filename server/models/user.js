const mongoose = require('../db/mongoose'),
  validator = require('validator'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
  email: {
    trim: true,
    required: true,
    minlength: 1,
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'not a valid email'
    }
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

//this is an instance method
UserSchema.methods.generateAuthToken = function() { //arrow functions cannot use this keyword thats why we cant use it
  var user = this
  console.log(user);
  var access = 'auth'
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'secret').toString() //sign takes the object and some secret value

  user.tokens.push({
    access,
    token
  })
  return token
}

UserSchema.methods.hashPass = function(password) {
  let saltRounds = 10
  return bcrypt.hashSync(password, saltRounds);
}
UserSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password)
}
UserSchema.methods.removeToken = async function(token) {
  //$pull--lets you remove specific objects from array
  let user = this
  return await user.update({
    $pull: {
      tokens: {
        token
      }
    }
  })
}
UserSchema.statics.getUserByToken = async function(token) {
  let decoded = ''
  try {
    decoded = jwt.verify(token, 'secret')
    return await User.findOne({
      _id: decoded._id,
      "tokens.token": token

    })
  } catch (err) {
    return null
  }


}
UserSchema.methods.toJSON = function() {
  var user = this
  return {
    _id: user._id,
    email: user.email
  }
}
var User = mongoose.model('Users', UserSchema);

module.exports = User;
