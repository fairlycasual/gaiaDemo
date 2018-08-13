import React, { Component } from 'react';
const assets = require('./assets.js');

class Header extends Component {
  constructor(props) {
    super(props);
  }

  // THIS COMPONENT NEEDS TO BE FIXED FOR LAYOUT
  render() {
    return (
      <div className="header">
        <div className="header-image">
          <img id="header-image" src={assets.gaiaIcon} />
        </div>
        <div className="header-right">
          {this.props.user}
          <img src={assets.userIcon} />
        </div>       
      </div>
    )
  }
}

export default Header;