import React, {Component} from 'react';
import {Link} from 'react-router';
import { renderRoutes } from 'react-router-config';

export default class AppRoot extends Component {
  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}