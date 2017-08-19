import AppRoot from './AppRoot';
import List from './List';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/list',
        component: List
      }
    ]
  }
];

export default routes;