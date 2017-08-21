'use strict';

import React from 'react' ;
import StaticRouter from 'react-router-dom/StaticRouter';
import thunk from 'redux-thunk';
import {renderToString} from 'react-dom/server';
import {applyMiddleware, createStore} from 'redux';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import routes from '../../client/routes';
import reducers from '../../client/modules';


function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
    <head>
        <title>Redux Universal Example</title>
    </head>
    <body>
    <div id="root">${html}</div>
    <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="/static/bundle.js"></script>
    </body>
    </html>`
}

module.exports.handleRender = (req, res) => {
    const store = createStore(reducers, applyMiddleware(thunk));
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route}) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    });
    return Promise.all(promises).then((data) => {
        let context = {};
        console.log(routes)
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
        res.send(renderFullPage(html, preloadedState))
    });
};
