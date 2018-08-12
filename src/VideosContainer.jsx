import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';


function imagesLoaded(parentNode) {
  const imgElements = parentNode.querySelectorAll("img");
  for (const img of imgElements) {
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridPhotos: [],
      loading: true,
    }

    this.renderImage = this.renderImage.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

renderImage(imageURL) {
  return (
    <img src={imageURL} onLoad={this.handleStateChange} onError={this.handleStateChange}/>
  );
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


  render() {
    return (
      <div className="video-container" ref={element => { this.galleryElement = element; }}>
        {this.renderSpinner()}
        <div class="grid-item">
          {this.props.videoThumbnails.map(imageURL => this.renderImage(imageURL))}
        </div>
      </div>
    )
  }


}

export default VideoContainer;