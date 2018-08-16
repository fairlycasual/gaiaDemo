import React, { Component } from 'react';
import Tile from './VideoTile.jsx';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { access } from 'fs';


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
    this.sortAlphabetical = this.sortAlphabetical.bind(this);
    this.sortCallbackA = this.sortCallbackA.bind(this);
    this.sortPopular = this.sortPopular.bind(this);
    this.sortCallbackP = this.sortCallbackP.bind(this);
    this.sortRecent = this.sortRecent.bind(this);
    this.sortCallbackR = this.sortCallbackR.bind(this);
  }

  renderTile(obj) {
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
  }

  generateStateObject(videoTitle, videoLikes, videoTimes, imageURL, dateAdded) {
    let keys = videoTitle;
    let urls = imageURL;
    let likes = videoLikes;
    let times = videoTimes;
    delete info.undefined;
    
    for (let i = 0; i < this.state.limit; i++) {
      if (keys[i] !== undefined) info[keys[i]] = {'url': urls[i], 'likes': likes[i], 'time': times[i], 'dateAdded': dateAdded[i]};
    }
  }

 
  sortAlphabetical(obj) {
    let alphaSort = Object.keys(obj)
      .sort()
      .reduce((acc, title) => {
        acc[title] = obj[title];
        return acc;
      }, {});
    this.setState({ informationObject: alphaSort });
  }

  sortPopular(obj) {
    let popularSort = {};
    Object.keys(obj).sort((a, b) => {
      return obj[b].likes - obj[a].likes;
    })
    .forEach((key) => {
      popularSort[key] = obj[key];
    });

    this.setState({ informationObject: popularSort });
  }

  sortRecent(obj) {
    let recentSort = {};
    Object.keys(obj).sort((a, b) => {
      return obj[a].videoCreateds - obj[b].videoCreateds;
    })
    .forEach((key) => {
      recentSort[key] = obj[key];
    });

    this.setState({ informationObject: recentSort });
  }

  sortCallbackA() {
    this.sortAlphabetical(this.state.informationObject);
  }

  sortCallbackP() {
    this.sortPopular(this.state.informationObject);
  }

  sortCallbackR() {
    this.sortRecent(this.state.informationObject);
  }

  componentDidMount() {
    this.generateStateObject(this.props.videoTitles, this.props.videoLikes, this.props.videoTimes, this.props.videoThumbnails);
    console.log('in component did mount, info:', info);
    
    this.setState({
      informationObject: info
    });
  }


    render() {
      { if(this.props.videoTitles.length === 0) return null;
        this.generateStateObject(this.props.videoTitles, this.props.videoLikes, this.props.videoTimes, this.props.videoThumbnails, this.props.videoCreateds)
      }

      return (
        <div className="video-container" ref={element => { this.galleryElement = element; }}>
          {this.renderSpinner()}
          <div className="dropdown-container">
            <div className="dropdown-text">
              SORT BY
              <br />
              <br />
            </div>
            <DropdownButton title="Recommended" noCaret id="dropdown-size-medium" style={{width: "100%", border: "1px solid lightGrey"}}>
            {/*Put a callback here onClick to trigger state change and re-render container*/}
              <MenuItem onSelect={this.sortCallbackA}>Alphabetical</MenuItem>
              <MenuItem onSelect={this.sortCallbackR}>Recently Added</MenuItem>
              <MenuItem onSelect={this.sortCallbackP}>Most Popular</MenuItem>
            </DropdownButton>
          </div>
          <div class="grid-item" >
            {this.renderTile(this.state.informationObject)}
          </div>
          <button onClick={this.loadMore} >
            LOAD MORE
          </button>
        </div>
      )
    }


}

export default VideoContainer;