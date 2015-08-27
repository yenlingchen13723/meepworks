import Application from '../../../build/application';
import Component from '../../../build/component';
import React from 'react';
import RouteHandler from '../../../build/components/route-handler';
import Link from '../../../build/components/link';
import Store from './store';
import * as Actions from './actions';
import path from 'path';
import css from './base.css!';
import { AppLoadFailed } from '../../../build/errors';


//export default class App extends Application {
//  render() {
//    return <div>Hello World!</div>;
//  }
//}
export default class App extends Application {
  static get routes() {
    return {
      'sub': {
        appPath: './sub-app'
      },
      '$default': {
        appPath: './default-app'
      },
      '$notfound': {
        appPath: './not-found'
      }
    };
  }
  static title() {
    return 'Meepworks';
  }
  static get stores() {
    return [
      Store
    ];
  }
  static get localeSetting() {
    return {
      path: './locales',
      locales: [
        'en-US',
        'zh-TW',
        'fr-FR'
      ]
    };
  }
  static willTransitionTo(transition, params, query, cb) {
    this.runAction(new Actions.Test('</script><script>alert("test")</script>')).then(cb).catch(cb);
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      store: Store.getInstance(this.context.appCtx).state,
      locale: this.locale
    };

    this.changeHandler = () => {
      this.setState({
        store: Store.getInstance(this.context.appCtx).state,
        locale: this.locale
      });
    };
  }
  componentDidMount() {
    this.getStore(Store).on(this.changeHandler);
    this.context.appCtx.on('error', (err) => {
      console.log('child application load failed', err);
    });
    this.context.appCtx.on('locale-change', (l) => {
      this.setState({
        locale: l
      });
    });
    this.runAction(new Actions.Test('Hello World!'));

    setTimeout(() => {
      this.setLocale('en-US');
    }, 2000);
  }
  componentWillUnmount() {
    Store.getInstance(this.context.appCtx).off(this.changeHandler);
  }
  render() {
    return (
      <div><ShowRoute />
        Msg: { this.state.store.get('msg') }<br />
        <Link to={`${this.context.appURL}/`}>Home</Link><br />
        <Link to={`${this.context.appURL}/sub`}>Sub</Link><br />
        <RouteHandler />
      </div>
    );
  }
}


class ShowRoute extends Component {
  render() {
    return (
      <div>Current Route: { this.context.currentPath }<br />
        { this.tmpl('content', {name: 'Jack'}) }
      </div>
    );
  }
}


