var mongoose = require('mongoose');

mongoose.Promise - global.Promise;
let url = process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp';
mongoose.connect(url);

module.exports = mongoose
