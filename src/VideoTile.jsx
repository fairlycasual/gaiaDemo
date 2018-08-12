import React, { Component } from 'react';


class Tile extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div id="tile">
          <img src={this.props.imageURL} />
          <div className="tile-title">
            {this.props.title}
          </div>
          <div className="video-description">
            {this.props.title}
          </div>
        </div>
    );
  }

  
}

export default Tile;