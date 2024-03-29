const config = require('./dbConfig.json');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const DB = require('./database.js');
const authCookieName = 'token';


const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('lezi');
const collection = db.collection('users');
// const PicCuts = client.db('haircut').collection('pics');
// const noPicCuts = client.db('haircut').collection('noPics');
const userNames = client.db('lezi').collection('users');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

/* // Insert a document
  const user = {
    name: name,
    password: passwordHash,
    side_length: side,
    top_length: top,
  };
  await collection.insertOne(house);

  // Query the documents
  const query = { name: 'Bob', password: input };
  const options = {i
  };

  const cursor = collection.find(query);
  const rentals = await cursor.toArray();
  rentals.forEach((i) => console.log(i));
} */

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(bodyParser.text());
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const info = JSON.parse(req.body);
  if (await getUser(info.userName)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(info.userName);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const info = JSON.parse(req.body);
  const user = await getUser(info.userName);
  console.log(info.userName);
  if (user) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
  }
  res.status(401).send({ msg: 'Not an existing user' });
});

apiRouter.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await collection.findOne({ token: authToken });
  if (user) {
    res.send({ userName: user.userName });
  }
});

function getUser(userName) {
  return collection.findOne({ userName: userName });
}

async function createUser(userName) {
  const user = {
    userName: userName,
    token: uuid.v4(),
  };
  await collection.insertOne(user);

  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

let cuts = [];
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Login to submit a haircut' });
  }
});

secureApiRouter.get('/checkCredents', async (_req, res) => {
  res.send({ msg: 'AOK' });
});


apiRouter.get('/get-cuts', async (_req, res) => {
  const cuts = await DB.getHaircuts();
  res.send(cuts);
})

apiRouter.post('/post-cut', async (req, res) => {
    cuts = await DB.addHaircut(req.body);
    res.send(cuts);
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
})

app.listen(4000, () => {
    console.log(`Web service listening on port 4000`);
  });