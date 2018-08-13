import React, { Component } from 'react';
import Tile from './VideoTile.jsx';
import { DropdownButton, MenuItem } from 'react-bootstrap';


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
      informationObject: {},
      limit: 20
    }

    this.renderTile = this.renderTile.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.generateStateObject = this.generateStateObject.bind(this);
    this.renderTile = this.renderTile.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  renderTile(obj) {
    console.log('render tile object length: ', Object.keys(obj).length)
    let tileArr = [];
    for (let key in obj) {
     
        let title = key;
        let url = obj[key].url;
        let likes = obj[key].likes;
        let time = obj[key].time
        tileArr.push(<Tile title={title} time={time} imageURL={url} likes={likes} />);
      
      
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

  loadMore() {
    let newLimit = this.state.limit + 20;
    this.setState({ limit: newLimit });
    console.log('new limit: ', this.state.limit)
  }

  generateStateObject(videoTitle, videoLikes, videoTimes, imageURL) {
    console.log('gso times: ', videoTimes);
    let keys = videoTitle;
    let urls = imageURL;
    let likes = videoLikes;
    let times = videoTimes;
    
    for (let i = 0; i < this.state.limit; i++) {
      info[keys[i]] = {'url': urls[i], 'likes': likes[i], 'time': times[i]}
    }
  }

    render() {
      { if(this.props.videoTitles.length === 0) return null;
        this.generateStateObject(this.props.videoTitles, this.props.videoLikes, this.props.videoTimes, this.props.videoThumbnails)
      }
      {console.log('info object in render ', info)}

      return (
        <div className="video-container" ref={element => { this.galleryElement = element; }}>
          {console.log('in render, info object: ', info)}
          {this.renderSpinner()}
          <div className="dropdown-container">
            <div className="dropdown-text">
              SORT BY
              <br />
              <br />
            </div>
            <DropdownButton title="Recommended" noCaret id="dropdown-size-medium" style={{width: "100%", border: "1px solid lightGrey"}}>
              <MenuItem>Recently Added</MenuItem>
              <MenuItem>Most Popular</MenuItem>
              <MenuItem>Alphabetical</MenuItem>
            </DropdownButton>
          </div>
          <div class="grid-item" >
            {this.renderTile(info)}
          </div>
          <button onClick={this.loadMore} >
            LOAD MORE
          </button>
        </div>
      )
    }


}

export default VideoContainer;