const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:0qMqNSlH8mUQHrme@nasacluster.0h6hv.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongo Connection is ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { mongoConnect, mongoDisconnect };
