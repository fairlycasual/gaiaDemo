import React, { Component } from 'react';
const assets = require('./assets.js');

class Header extends Component {
  constructor(props) {
    super(props);
  }

  // THIS COMPONENT NEEDS TO BE FIXED FOR LAYOUT
  render() {
    return (
      <div class="header">
        
          <img src={assets.gaiaIcon} />
       
        
          {this.props.user}
          <img src={assets.userIcon} />
        
      </div>
    )
  }
}

export default Header;