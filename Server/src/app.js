const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const api = require("./routes/api");

//Define origin that can be allowed by cors
//Authentication
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

//Middlewares
app.use(express.json());

app.use("/v1", api);

app.use(express.static(path.join(__dirname, "..", "public")));

//Router
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
