'use strict';

// const express = require('express');
import express from 'express';
import {handleRender} from  './middlewares/reactRender';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(handleRender);

app.set('port', port);
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});