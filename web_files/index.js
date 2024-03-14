const config = require('./dbConfig.json');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('haircut');
const PicCuts = client.db('haircut').collection('pics');
const noPicCuts = client.db('haircut').collection('noPics');
const userNames = client.db('users').collection('users');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

/* // Insert a document
  const house = {
    name: 'Beachfront views',
    summary: 'From your bedroom to the beach, no shoes required',
    property_type: 'Condo',
    beds: 1,
  };
  await collection.insertOne(house);

  // Query the documents
  const query = { property_type: 'Condo', beds: { $lt: 2 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };

  const cursor = collection.find(query, options);
  const rentals = await cursor.toArray();
  rentals.forEach((i) => console.log(i));
}

main().catch(console.error); */

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(bodyParser.text());
app.use(express.static('public'));


var apiRouter = express.Router();
app.use('/api', apiRouter);

let cuts = [];
apiRouter.get('/get-cuts', (_req, res) => {
    res.send(cuts);
})

apiRouter.post('/post-cut', (req, res) => {
    cuts = updateCuts(req.body, cuts);
    console.log(req.body);
    console.log("1");
    res.send(cuts);
    //
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
})

app.listen(4000, () => {
    console.log(`Web service listening on port 4000`);
  });

function updateCuts(newCut, cuts) {
    cuts.push(newCut);
    return cuts;
}