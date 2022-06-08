const http = require("http");
const app = require("./app");

require("dotenv").config();

const { mongoConnect } = require("./services/mongo");
const { loadPlanets } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const server = http.createServer(app);

async function startServer() {
  //Returns a promise, connect req 4 mandatory parameters
  await mongoConnect();
  await loadPlanets();
  await loadLaunchData();

  server.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
  });
}

startServer();
