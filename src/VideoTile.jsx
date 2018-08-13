import React, { Component } from 'react';


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
            <br />
            <br />
          </div>
        </div>
    );
  }

  
}

export default Tile;