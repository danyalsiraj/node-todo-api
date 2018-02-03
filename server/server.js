var Todo = require('./models/todo');
var User = require('./models/user');

const express = require('express'),
  bodyParser = require('body-parser'),
  ObjectID = require('mongodb').ObjectID;
let app = express();

app.use(bodyParser.json());
app.post('/todos', authenticate, async (req, res) => {
  console.log(req.body)
  let task = new Todo(req.body);
  task._author = req.user._id
  task.save().then(
    (result) => {
      res.status(201).json({
        todo: task
      })
    }, (err) => {
      res.status(400).send(err)
      return
    })
})

app.get('/todos/:id', authenticate, async (req, res) => {
  Todo.findOne({
    _id: req.params.id,
    _author: req.user._id
  }, (err, todo) => {
    if (err) {
      res.status(400).send(err)
      return;
    }

    if (todo) {
      res.status(200).json({
        todo
      })
    } else {
      res.status(404).send()
    }

  })


})
app.get('/todos', authenticate, async (req, res) => {
  Todo.find({
    _author: req.user._id
  }, (err, todos) => {
    if (todos) {
      res.status(200).json({
        todos
      })
    }
    if (err) {
      res.status(400).send(err)
    }
    return;
  })

})
app.delete('/todos/:id', authenticate, async (req, res) => {
  Todo.remove({
    _id: req.params.id,
    _author: req.user._id

  }, (err, removed) => {
    if (err) {
      res.status(400).send(err)
      return
    }
    if (removed) {
      res.status(200).json({
        removed
      })
    } else {
      res.status(404).send()
    }

  })

})
app.put('/todos/:id', authenticate, async (req, res) => {
  Todo.findOneAndUpdate({
    _id: req.params.id,
    _author: req.user._id

  }, {
    $set: {
      text: req.body.text,
      completed: req.body.completed,
      completedAt: req.body.completed ? new Date() : null
    }
  }, (err, updated) => {
    if (err) {
      res.status(400).send(err)
      return
    }
    if (updated) {
      res.status(200).json({
        updated
      })
    } else {
      res.status(404).send()
    }
  })

})

app.post('/users', async (req, res) => {
  let user = new User(req.body)
  user._id = new ObjectID();
  user.password = user.hashPass(req.body.password)
  let token = user.generateAuthToken();
  user.save({}, (err, user) => {
    if (err) {
      res.status(400).send(err)
      return
    }
    if (user) {
      res.status(200).header('x-auth', token).json({
        user
      })
    }
  })
})
app.post('/login', async (req, res) => {
  let useremail = req.body.email,
    password = req.body.password,
    retrivedUser = ''

  retrivedUser = await User.findOne({
    email: useremail
  }).catch(err => {
    return null
  });
  if (!retrivedUser || !retrivedUser.compareHash(password)) {
    res.status(401).send()
    return
  }
  let token = retrivedUser.generateAuthToken();
  await retrivedUser.save();
  res.status(200).header('x-auth', token).json({
    user: retrivedUser
  })

})

async function authenticate(req, res, next) {
  let user = await User.getUserByToken(req.header('x-auth'))
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).send()
  }

}
app.delete('/logout', authenticate, async (req, res) => {
  let logout = req.user.removeToken(req.header('x-auth'))
  if (!logout) {
    res.status(401).send()
    return
  }
  res.status(200).send()

})
app.get('/users/me', authenticate, async (req, res) => {
  res.status(200).json({
    user: req.user
  })
})

app.get('/users/:id', async (req, res) => {

})
app.get('/users', async (req, res) => {

})
app.delete('/users/:id', async (req, res) => {

})
app.put('/users/:id', async (req, res) => {

})

const port = process.env.PORT || 3000; // heroku sets a custom port every time, this uses 3000 if no other port is set

let server = app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
}); //listens to the port

module.exports = server;
