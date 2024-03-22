const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('lezi');
const userCollection = db.collection('users');
const cutCollection = db.collection('haircuts');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addHaircut(cut) {
  cutCollection.insertOne(cut);
  const cuts = await cutCollection.find().sort({createdAt: -1}).limit(12).toArray();
  return cuts;
}

async function getHaircuts() {
  const cuts = await cutCollection.find().sort({createdAt: -1}).limit(12).toArray();
  return cuts;
}

module.exports = {
  addHaircut,
  getHaircuts,
};
