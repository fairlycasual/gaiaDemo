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
    this.sortCallback = this.sortCallback.bind(this);
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

  generateStateObject(videoTitle, videoLikes, videoTimes, imageURL) {
    let keys = videoTitle;
    let urls = imageURL;
    let likes = videoLikes;
    let times = videoTimes;
    delete info.undefined;
    
    for (let i = 0; i < this.state.limit; i++) {
      if (urls[i] !== undefined) info[keys[i]] = {'url': urls[i], 'likes': likes[i], 'time': times[i]};
    }
  }

  // sorting could be a good use case for redux
  sortAlphabetical(obj) {
    console.log('sort A clicked');
    let newState = Object.keys(this.state.informationObject)
      .sort()
      .reduce((acc, title) => {
        console.log('in reduce, accumulator ', acc);
        acc[title] = this.state.informationObject[title];
        return acc;
      }, {});
    this.setState({ informationObject: newState });
  }

  sortCallback() {
    this.sortAlphabetical(this.state.informationObject);
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
        this.generateStateObject(this.props.videoTitles, this.props.videoLikes, this.props.videoTimes, this.props.videoThumbnails)
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
              <MenuItem>Recently Added</MenuItem>
              <MenuItem>Most Popular</MenuItem>
              <MenuItem onSelect={this.sortCallback}>Alphabetical</MenuItem>
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