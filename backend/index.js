const express = require('express')
const app = express()
const port = 3000
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dbo = require("./db/conn");

const corOptions = {
  origin: ["http://localhost:9000"],
  methods: ["GET", "POST"],
};
app.use(cors(corOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/register", async (req, res) => {
  const params = req.body;
  let psw = params.psw;
  delete params.psw;
  params.salt = crypto.randomBytes(16).toString('hex'); 
  params.hash = crypto.pbkdf2Sync(psw, params.salt,  
  1000, 64, `sha512`).toString(`hex`);
  const dbConnect = dbo.getDb();
  await dbConnect.collection("users").insertOne(params);
  res.send("SUCCESS");
});

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
});

app.get("/login", async (req, res) => {
  const dbConnect = dbo.getDb();
  const user = await dbConnect.collection("users").findOne({
    $or: [
      {email: req.query.email},
      {username: req.query.username}
    ]
  });
  if (user != null) {
    const hash = crypto.pbkdf2Sync(req.query.psw, user.salt, 1000, 64, `sha512`).toString(`hex`); 
    if (hash === user.hash) {
      res.send(user);
    } else {
      res.status(401).send("Incorrect Password")
    }
  } else {
    res.status(400).send("User not found")
  }
})