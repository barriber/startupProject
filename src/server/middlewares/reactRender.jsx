'use strict';

const React = require('react');
const StaticRouter = require('react-router-dom/StaticRouter');
const thunk = require('redux-thunk');
const {renderToString} = require('react-dom/server');
const {applyMiddleware, createStore} = require('redux');
const {matchRoutes, renderRoutes} = require('react-router-config');
const {Provider} = require('react-redux');
const routes = require('../../client/routes');
const reducers = require('../../client/modules');


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
        const store = createStore(counterApp)

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
