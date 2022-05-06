const express = require('express');
const app = express();
const planetRouter = require('./routes/planets/planets.router');

app.use(express.json());
app.use(planetRouter);

module.exports = app;