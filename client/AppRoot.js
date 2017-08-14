import React, {Component} from 'react';
import {Link} from 'react-router';

export default class AppRoot extends Component {
  render() {
    return (
      <div>
        <h2>React Universal App</h2>
        <Link to="/home"> Home </Link>
        <Link to="/list"> List </Link>
        {this.props.children}
      </div>
    );
  }
}