'use strict';

// const express = require('express');
import express from 'express';
import handleRender from  './middlewares/reactRender';
import bodyParser from 'body-parser';  
import path from 'path';
import cookieParser from 'cookie-parser';

const publicPath = path.resolve(__dirname, '..', '..', '..','public', 'javascripts');

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicPath));

app.use('/', handleRender);

app.set('port', port);
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});