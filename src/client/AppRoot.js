import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AppRoot extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}