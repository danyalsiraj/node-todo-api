//const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb'); //destructuring

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db) => { //connect takes two arguments db adress and callback
  //mongo automatically creates the database as soon as we start writing data to it
  //thats why we did not get any error when we connected to TodoApi db without connecting it
  if (err) {
    return console.log('Unable to connect to database');
  }
  console.log('connected to mongodb server');
  //delete many
  db.collection('Todos').deleteOne({
    completed: true
  }).then((result) => {
    console.log(result);
  })
  //delete one

  //find one and delete

  db.close();
});
