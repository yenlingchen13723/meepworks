import Application from '../../../build/application';

export default class Child2 extends Application {
  get path() {
    return 'child2';
  }
  get component() {
    return './sub-view';
  }
  get locale() {
    return {
      path: '../locale',
      locales: [
        'en_US'
      ]
    }
  }
  title() {
    return 'meepworks/sub';
  }
  get dirname() {
    return __dirname;
  }
  onLeave() {
    //console.log('onLeave');
  }
  routerWillLeave() {
    //console.log('routerWillLeave');
  }
}
