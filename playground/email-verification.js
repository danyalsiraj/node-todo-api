const validator = require('validator');

var email = 'adad@gmailcom'
if (validator.isEmail(email)) {
  console.log('valid email');
} else {
  console.log('invalid email');
}
