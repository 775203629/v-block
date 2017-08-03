/**
 * Created by zonebond on 2017/5/2.
 */
import {cloneElement} from 'react'

export default class RouterCtrl {
  _routes = [];

  registerRoutes = routes => {
    routes = Array.isArray(routes) ? routes : [routes];
    routes.forEach(route => this._routes.push(route));
  };

  attachRoutes = props => {
    process.env.NODE_ENV === 'development' && console.info('>>> Routes Attach >>>', 'App');
    return this._routes.map((route, idx) => cloneElement(route, {key: idx, ...props}));
  };
}