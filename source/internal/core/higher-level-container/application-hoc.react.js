import React, { PropTypes } from 'react';
import { PropTypes as RouterPropTypes } from 'react-router'
import Component from '../../../component';

const ApplicationHOC = (WrapperComponent, applicationInstance, contextObject, child) => (
  class K extends Component {
    static get contextTypes() {
      return {
        ctx: PropTypes.object,
        locale: PropTypes.func,
        history: RouterPropTypes.history,
        route: RouterPropTypes.route
      };
    }
    static get childContextTypes () {
      return {
        ctx: PropTypes.object,
        locale: PropTypes.func
      }
    }
    componentDidMount() {
      if(this.routerWillLeave !== applicationInstance.prototype.routerWillLeave &&
         typeof child.routerWillLeave === 'function') {
        this._unlistenBeforeLeavingRoute = this.context.history.listenBefore(
          child.routerWillLeave.bind(this)
        );
      }
    }
    componentWillUnmount() {
      if(this._unlistenBeforeLeavingRoute) {
        this._unlistenBeforeLeavingRoute();
      }
    }
    getChildContext() {
      return contextObject.context;
    }
    render() {
      return (<WrapperComponent {...this.props}/>)
    }
  }
)

export default ApplicationHOC
