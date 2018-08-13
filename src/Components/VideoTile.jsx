import React, { Component } from 'react';
const assets = require('../assets.js');

class Tile extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
        <div id="tile">
          <img src={this.props.imageURL} />
           <br /> 
          <div className="tile-title">
            {this.props.title} 
            <br />
            {this.props.time}
            <br />
            <br />
            <div className="tile-likes">
              <img src={assets.thumbsUp}    style={{width: 15, height: 15, marginRight: 5, marginBottom: 12, marginTop: 12}}/>{this.props.likes}
            </div>
          </div>
        </div>
    );
  }

  
}

export default Tile;