const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/cuts', (_req, res) => {
    res.send(cuts);
})

apiRouter.post('/cuts', (req, res) => {
    res.send(cuts);
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
})

app.listen(4000, () => {
    console.log(`Web service listening on port 4000`);
  });

let cuts = [];
function updateCuts(newCut, cuts) {
    cuts.push(newCut);
    return cuts;
}