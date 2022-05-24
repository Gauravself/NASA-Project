const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanets } = require("./models/planets.model");

const PORT = 5000;

//MongoDB URL for appn
const MONGO_URL = 'mongodb+srv://nasa-api:0qMqNSlH8mUQHrme@nasacluster.0h6hv.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
  console.log('Connection is ready');
})

mongoose.connection.on('error',(err)=>{
  console.error(err);
})

async function startServer() {
  //Returns a promise, connect req 4 mandatory parameters
  await mongoose.connect(MONGO_URL);

  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

startServer();
