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
  if (req.params.id) {
    Todo.findOne({
      _id: req.params.id
    }, (err, todo) => {
      if (todo) {
        res.status(200).json({
          todo
        })
      }
      if (err) {
        res.status(400).send(err)
      }
      return;
    })
  }
  res.status(404).send()

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

const port = process.env.PORT || 3000; // heroku sets a custom port every time, this uses 3000 if no other port is set

let server = app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
}); //listens to the port

module.exports = server;
