const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db) => { //connect takes two arguments db adress and callback
  //mongo automatically creates the database as soon as we start writing data to it
  //thats why we did not get any error when we connected to TodoApi db without connecting it
  if (err) {
    return console.log('Unable to connect to database');
  }
  console.log('connected to mongodb server');
  ////To add to collection
  // db.collection('Todos').insertOne({
  //   text: 'Something to Do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert in the DB', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2)); //ops stores all the documents that were inserted
  // });

  db.collection('Users').insertOne({
    name: 'Danyal',
    age: 23,
    location: 'Canada'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert user');
    }
    console.log(result.ops);
  });
  db.close();
});
