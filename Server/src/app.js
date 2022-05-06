const cors = require('cors');
const express = require('express');
const app = express();
const planetRouter = require('./routes/planets/planets.router');

//Define origin that can be allowed by cors
app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(express.json());
app.use(planetRouter);

module.exports = app;