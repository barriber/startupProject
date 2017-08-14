import path from 'path'
import express from 'express';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/App';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from '../client/routes';

const favicon = require('serve-favicon');

const app = Express()
const port = 3000

app.use('/static', Express.static('static'));

app.use(handleRender);
function handleRender(req, res) {
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({ route }) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    });
    return Promise.all(promises).then((data) => {
        let context = {};
        const store = createStore(counterApp)

        // Render the component to a string
        const html = renderToString(
            <StaticRouter location={req.url} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        )

        // Grab the initial state from our Redux store
        const preloadedState = store.getState()

        // Send the rendered page back to the client
        res.send(renderFullPage(html, preloadedState))
    });
}
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
    </html>
    `
}

app.listen(port);