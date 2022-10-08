require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const characterRoute = require('../src/routes/characterRoute');
const movieRoute = require('../src/routes/movieRoute');
const userRoute = require('../src/routes/userRoute');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/characters', characterRoute);
app.use('/movies', movieRoute);
app.use('/', userRoute);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));