'use strict';

const express = require('express');
const handleRender = require('./middlewares/reactRender');
const favicon = require('serve-favicon');

const app = Express();
const port = 3000;

app.use('/static', Express.static('static'));

app.use(handleRender);

app.listen(port);