var mongoose = require('mongoose');

mongoose.Promise - global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Date
  }
});

// var newTodo = new Todo({
//   text: 'DO this1'
// });
// save(newTodo);
// var newTodo2 = new Todo({
//   text: 'do this too',
//   completed: false
// });
// save(newTodo2).then((res) => {
//   console.log(res);
//   if (res._id) {
//     newTodo2.completedAt = res._id.getTimestamp();
//   }
//   save(newTodo2);
// });

const createTask = async (req, res) => {
  console.log(req.body);
  let task = await save(new Todo(req.body));
  if (!task._id) {
    res.status(404).send()
    return
  } else {
    res.status(200).json({
      task
    })
  }
}

function save(task) {
  return task.save()
    .then((result) => {
      //console.log('task saved', result);
      return result;
    }, (err) => {
      //console.log('task not saved', err);
      return err;
    });
}

var User = mongoose.model('Users', {
  email: {
    trim: true,
    required: true,
    minlength: 1,
    type: String
  }
});
var newUser = new User({
  email: 'aaa'
})
save(newUser);

// newTodo.save().then((result) => {
//   console.log('task saved', result);
// }, (err) => {
//   console.log('task not saved', err);
// });
module.exports = {
  createTask
}
