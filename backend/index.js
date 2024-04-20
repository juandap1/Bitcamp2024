const express = require('express')
const app = express()
const port = 3000
const dbo = require("./db/conn");
require("dotenv").config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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