'use strict';

import express from 'express';
import React from 'react' ;
import StaticRouter from 'react-router-dom/StaticRouter';
import thunk from 'redux-thunk';
import {renderToString} from 'react-dom/server';
import {applyMiddleware, createStore} from 'redux';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import routes from '../../client/routes';
import reducers from '../../client/modules';

const router = express.Router();
const store = createStore(reducers, applyMiddleware(thunk));

function renderFullPage(html, preloadedState) {
    return `<html>
    <head>
        <title>Redux Universal Example</title>
    </head>
    <body>
    <div id="root">${html}</div>
    <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/static/bundle.js"></script>
    </body>
    </html>
    `
}

router.get ('*', (req, res) => {
    
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route}) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    });
    return Promise.all(promises).then((data) => {
        let context = {};
        // Render the component to a string
        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        )

        // Grab the initial state = require( our Redux store
        const preloadedState = store.getState()

        // Send the rendered page back to the client
        const x = renderFullPage(html, preloadedState);
        res.send(x)
    });
});

module.exports = router;
