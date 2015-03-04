import StoreBase from '../store-base';
import Im from 'immutable';
import debug from 'debug';
import {SET_ROUTES} from '../actions/set-routes';

const log = debug('route-table');

const DATA = Symbol();

export default class RouteTable extends StoreBase {
  constructor() {
    this.rehydrate({
        routes: {},
        srcRoot: '/'
    });
  }
  get handlers() {
    return [ {
      action: SET_ROUTES,
      handler: this.handleSetRoutes
    }];
  }
  handleSetRoutes(payload) {
    log('handleSetRoutes', payload);
    this[DATA] = this[DATA].withMutations((map) => {
      map
        .set('routes', Im.fromJS(payload.routes))
        .set('srcRoot', payload.srcRoot);
    });
  }
  rehydrate(state) {
    if(state) {
      this[DATA] = Im.fromJS(state);
    }
  }
  dehydrate() {
    return this[DATA].toJS();
  }
  getRoutes() {
    return this[DATA].get('routes').toJS();
  }
  getSrcRoot() {
    return this[DATA].get('srcRoot');
  }
}
