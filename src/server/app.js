'use strict';

// const express = require('express');
import express from 'express';
import {handleRender} from  './middlewares/reactRender';

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static('static'));

app.use(handleRender);

app.set('port', port);
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});