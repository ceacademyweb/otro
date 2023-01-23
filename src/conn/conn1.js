const connOBJ = require('./conn.config');
const mongodb = connOBJ.mongodb;
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = `mongodb://mongo:QeqtrEAbNx1b8RZooPnX@containers-us-west-29.railway.app:7198`;

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  if (err) throw err;
  console.log('Connected successfully to server');

  const db = client.db('database');
  client.close();
});
module.exports = MongoClient;
