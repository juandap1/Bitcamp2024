const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const dbo = require("./db/conn");
const jdenticon = require("jdenticon");
const { ObjectId } = require("mongodb");
const http = require("http");

const corOptions = {
  origin: ["http://localhost:9000"],
  methods: ["GET", "POST"],
};
app.use(cors(corOptions));

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const params = req.body;
  let psw = params.psw;
  delete params.psw;
  params.salt = crypto.randomBytes(16).toString("hex");
  params.hash = crypto
    .pbkdf2Sync(psw, params.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  const dbConnect = dbo.getDb();
  await dbConnect.collection("users").insertOne(params);
  res.send("SUCCESS");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

app.get("/login", async (req, res) => {
  const dbConnect = dbo.getDb();
  const user = await dbConnect.collection("users").findOne({
    $or: [{ email: req.query.email }, { username: req.query.email }],
  });
  if (user != null) {
    const hash = crypto
      .pbkdf2Sync(req.query.psw, user.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    if (hash === user.hash) {
      res.send(user);
    } else {
      res.status(401).send("Incorrect Password");
    }
  } else {
    res.status(400).send("User not found");
  }
});

app.get("/remember/:id", async (req, res) => {
  try {
    const uid = new ObjectId(req.params.id);
    const dbConnect = dbo.getDb();
    const user = await dbConnect.collection("users").findOne({
      _id: uid,
    });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

app.get("/merchant", async (req, res) => {
  try {
    const dbConnect = dbo.getDb();
    const merchant = await dbConnect.collection("merchants").findOne({
      _id: new ObjectId(req.query.id),
    });
    if (merchant) {
      res.send(merchant);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/avatar/:id", async (req, res) => {
  const png = jdenticon.toPng(req.params.id, 200);
  res.set("Content-Type", "image/png");
  res.send(png);
});

app.post("/session/create", async (req, res) => {
  const dbConnect = dbo.getDb();
  try {
    const merchant = new ObjectId(req.body.mId);
    const mInfo = await dbConnect
      .collection("merchants")
      .findOne({ _id: merchant });
    if (mInfo == null) {
      res.status(400).send();
    } else {
      const session = {
        merchantId: merchant,
        items: [],
        users: [],
        redir: `http://localhost:9000/#/menu/${merchant}`,
        tip: true,
        timestamp: new Date(),
      };
      const inserted = await dbConnect.collection("session").insertOne(session);
      res.send(inserted.insertedId);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
