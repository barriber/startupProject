'use strict';

// const express = require('express');
import express from 'express';
console.log('xxx');
const handleRender = require('./middlewares/reactRender.jsx');
const favicon = require('serve-favicon');

const app = Express();
const port = 3000;

app.use('/static', Express.static('static'));

app.use(handleRender);

app.listen(port);