const express = require("express");
const indexRouter = require('./routes/indexRouter');
const kindergartenRouter = require('./routes/kindergartenRouter');

const app = express();

app.use(express.json());

app.use('/', indexRouter);
app.use('/kindergarten', kindergartenRouter);

app.use((req, res, next) => {
    res.status(404).json("You've hit an unsupported endpoint!");
});

app.use((err, req, res, next) => {
    res.status(500).json('Oops, my bad! Try again later.');
});

module.exports = app;
