import React from 'react';
import { render } from 'react-dom';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import thunk from 'redux-thunk';
import reducers from './modules';
import routes from './routes';
// import App from './containers/App'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(reducers, preloadedState,  applyMiddleware(thunk))

const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

render(<AppRouter />, document.querySelector('#root'));