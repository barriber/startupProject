import AppRoot from './AppRoot';
import List from './List';
import Home from './Home';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/home',
        component: Home
      }
    ]
  }
];

export default routes;