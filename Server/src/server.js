const http = require("http");
const app = require("./app");
const { loadPlanets } = require("./models/planets.model");

const PORT = 5000;

const server = http.createServer(app);

await loadPlanets();

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
