import React, { Component } from 'react';

class Hero extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="hero">
        <div className="background-image">
          <img src={this.props.backgroundImage} />
        </div>
      </div>
    );
  }

  
}

export default Hero;