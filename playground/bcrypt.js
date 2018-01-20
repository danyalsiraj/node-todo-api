// sync approach
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'Dany';
const someOtherPlaintextPassword = 'not_bacon';

console.log(myPlaintextPassword);
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(myPlaintextPassword, salt);
console.log(hash);
var hash2 = bcrypt.hashSync(myPlaintextPassword, salt);
var compare = bcrypt.compareSync(myPlaintextPassword, hash2);
if (compare === hash) {
  console.log('same');
} else {
  console.log(compare);
}

// //async approach
// var bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 'dany';
// const someOtherPlaintextPassword = 'not_bacon';
// var hashpass = ' ';
// bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
//   if (err) {
//     console.log(err);
//   } else {
//     hashpass = hash;
//     console.log(hash);
//   }
// });
//
// bcrypt.compare(myPlaintextPassword, hashpass, function(err, res) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });
