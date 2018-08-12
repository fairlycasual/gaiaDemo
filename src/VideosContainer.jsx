import React, { Component } from 'react';
import Tile from './VideoTile.jsx';


function imagesLoaded(parentNode) {
  const imgElements = parentNode.querySelectorAll("img");
  for (const img of imgElements) {
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

let info = {};

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridPhotos: [],
      loading: true,
      informationObject: {}
    }

    this.renderTile = this.renderTile.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.generateStateObject = this.generateStateObject.bind(this);
    this.renderTile = this.renderTile.bind(this);
  }
  
  // change to render component and pass more than just URL
  // need image url, title string, and the description string. no trailer link in response?
  // <VideoTile title={this.}
  renderTile(obj) {
    let tileArr = [];
    for (let key in obj) {
      let title = obj.key;
      let url = obj[key]
      tileArr.push(<Tile title={title} imageURL={url} />);
    }
    return tileArr;
  }

  renderSpinner() {
    if (!this.state.loading) {
      return null;
    }
    return (
      <span className="spinner" />
    );
  }

  handleStateChange() {
    this.setState({
      loading: !imagesLoaded(this.galleryElement),
    });
  }

  generateStateObject(videoTitle, imageURL) {
    let keys = videoTitle;
    let values = imageURL;

    // console.log('keys in gSO: ', keys);
    const closure = () => {
      // console.log('generateStateObject called at render, titles passed in: ', videoTitle);

      for (let i = 0; i < keys.length; i++) {
        info[keys[i]] = values[i];
      }
      console.log(info);
    };

    closure()
  }

  updateState() {
    this.setState({informationObject: info});
    console.log(this.state);
  }

  // componentWillMount() {
  //   this.generateStateObject(this.props.videoTitles, this.props.videoThumbnails);
  //   this.setState({ informationObject: info });
  // }

    render() {
      return (
        <div className="video-container" ref={element => { this.galleryElement = element; }}>
          {this.renderSpinner()}
          {this.generateStateObject(this.props.videoTitles, this.props.videoThumbnails)}
          <div class="grid-item" >
            {this.renderTile(info)}
          </div>
        </div>
      )
    }


}

export default VideoContainer;