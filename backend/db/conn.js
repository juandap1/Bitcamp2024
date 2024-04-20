const { MongoClient } = require("mongodb");
const connectionString = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PSW}@bitcamp2024.m0kwjlt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(connectionString);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    dbConnection = client.db("College");
    console.log("Successfully connected to MongoDB.");

    return callback();
  },

  getDb: function () {
    return dbConnection;
  },
};
