import React, { Component } from 'react';

class Hero extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="hero">
        <img src={this.props.backgroundImage} />
        <div className="hero-title">
          {this.props.title}
        </div>
        <div className="hero-description">
          {this.props.description}
        </div>
      </div>
    );
  }

  
}

export default Hero;