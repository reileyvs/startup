const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const userName = 'something';
const password = 'thisthing';
const hostname = 'mongodb.com';

const url = `mongodb+srv://${userName}:${password}@${hostname}`;
const client = new MongoClient(url);

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