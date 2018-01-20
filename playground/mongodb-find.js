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
  db.collection('Todos').find({
    _id: new ObjectID('5a6376b1feb6e8338074e7b7')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable to fetch', err);

  })
  db.close();
});
