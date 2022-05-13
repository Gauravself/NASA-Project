const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');

const planetRouter = require('./routes/planets/planets.router');
const {launchesRouter} = require('./routes/launches/launches.router');

//Define origin that can be allowed by cors
//Authentication
app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(morgan('combined'));

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use('/planets',planetRouter);
app.use('/launches', launchesRouter);

//Router
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});

module.exports = app;