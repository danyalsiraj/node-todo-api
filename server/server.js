var Todo = require('./models/todo');
var User = require('./models/user');

const express = require('express'),
  bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());
app.post('/todos', async (req, res) => {
  console.log(req.body);
  let task = new Todo(req.body);
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

app.get('/todos/:id', async (req, res) => {
  Todo.findOne({
    _id: req.params.id
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
app.get('/todos', async (req, res) => {
  Todo.find({}, (err, todos) => {
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
app.delete('/todos/:id', async (req, res) => {
  Todo.remove({
    _id: req.params.id
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
app.put('/todos/:id', async (req, res) => {
  Todo.findOneAndUpdate({
    _id: req.params.id
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


const port = process.env.PORT || 3000; // heroku sets a custom port every time, this uses 3000 if no other port is set

let server = app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
}); //listens to the port

module.exports = server;
