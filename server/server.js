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

const port = process.env.PORT || 3000; // heroku sets a custom port every time, this uses 3000 if no other port is set

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
}); //listens to the port
