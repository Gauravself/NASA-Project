const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");

const { loadPlanets } = require("./models/planets.model");

const server = http.createServer(app);
const PORT = 5000;

async function startServer() {
  //Returns a promise, connect req 4 mandatory parameters
  await mongoConnect();

  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

startServer();
