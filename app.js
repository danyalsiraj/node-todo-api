const express = require('express'),
  bodyParser = require('body-parser'),
  server = require('./server/server.js')
let app = express();
app.use(bodyParser.json());
app.post('/todo', server.createTask)
const port = process.env.PORT || 3000; // heroku sets a custom port every time, this uses 3000 if no other port is set

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
}); //listens to the port
