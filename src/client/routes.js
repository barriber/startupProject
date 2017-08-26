import AppRoot from './AppRoot';
import Home from './Home';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/x',
        component: Home
      }
    ]
  }
];

export default routes;