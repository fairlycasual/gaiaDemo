import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Hero from './Components/Hero.jsx';
import Header from './Components/Header.jsx';
import VideoContainer from './Components/VideosContainer.jsx';
import Navigation from './Components/Nav.jsx';
import './app.css';

const API = 'https://d6api.gaia.com/videos/term/119931';

library.add(faSearch)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroBanner: '',
      heroTitle: '',
      heroDescription: '',
      videoThumbnails: [],
      titles: [],
      likes: [],
      createds: [],
      times: [],
      isLoggedIn: true,
      userName: 'DAVID',
      
    };

    this.generateThumbnails = this.generateThumbnails.bind(this);
    this.generateTitles = this.generateTitles.bind(this);
    this.generateLikes = this.generateLikes.bind(this);
    this.generateHeroImg = this.generateHeroImg.bind(this);
    this.generateHeroDescription = this.generateHeroDescription.bind(this);
    this.generateHeroTitle = this.generateHeroTitle.bind(this);
    this.generateTimes = this.generateTimes.bind(this);
    this.updateState = this.updateState.bind(this);
  }

    // function to isolate thumbnails into array
    generateThumbnails(data) {
      let keyArtArr = [];
      for (let i = 0; i < data.titles.length; i++) {
        let keyArtURL = data.titles[i].keyart_16x9_withtext.keyart_304x171;
        keyArtArr.push(keyArtURL);
      }
      this.setState({ videoThumbnails: keyArtArr });
    }

    // function to isolate titles into array
    generateTitles(data) {
      let titlesArr = [];
      for (let i = 0; i < data.titles.length; i++) {
        let title = data.titles[i].title;
        if (title !== undefined) {
        titlesArr.push(title);
        }
      }
      this.setState({ titles: titlesArr });
    }

    // function to isolate likes on videos to array
    generateLikes(data) {
      let likesArr = [];
      for (let i = 0; i < data.titles.length; i++) {
        let likes = data.titles[i].fivestar.up_count.value;
        likesArr.push(likes);
      }
      this.setState({ likes: likesArr });
    }

    // function to isolate video runtimes to array
    generateTimes(data) {
      let timesArr = [];
      for (let i = 0; i < data.titles.length; i++) {
        if (data.titles[i].feature) {
          let time = data.titles[i].feature.duration;
          let minutes = Math.round(time / 60);
          timesArr.push(minutes + ' mins')
          
        } else {
          let seasons = data.titles[i].season_nums.length;
          timesArr.push(seasons + ' Seasons');
          
        }
      }
      this.setState({ times: timesArr });
    }

    generateCreatedAt(data) {
      let datesArr = [];
      for (let i = 0; i < data.titles.length; i++) {
        let created = data.titles[i].fivestar.created;
        datesArr.push(created);
      }
      this.setState({ createds: datesArr });
    }

    // function to isolate hero banner image, pass as prop to Hero component
    generateHeroImg(data) {
      // eventually generate the array for screen sizes
      let img = data.term.termImages.hero.hero_1440x300;
      this.setState({ heroBanner: img });
    }

    // ...  hero description ... 
    generateHeroDescription(data) {
      let description = data.term.body;
      this.setState({ heroDescription: description });
    }

    // ... hero title ... 
    generateHeroTitle(data) {
      let title = data.term.name.toUpperCase();
      this.setState({ heroTitle: title });
    }

    updateState(data) {
      this.generateThumbnails(data);
      this.generateTitles(data);
      this.generateTimes(data);
      this.generateLikes(data);
      this.generateHeroImg(data);
      this.generateHeroDescription(data);
      this.generateHeroTitle(data);
    }

  componentDidMount() {
    fetch(API, {
      headers: { "Content-Type" : "application/json"}
    })
      .then(response => response.json())
      .then(data => {
        this.updateState(data);
      })
      .catch(error => console.error(error))
  }
  
  render() {
    return (
      <div id="app">
        <Header user={this.state.userName} />
        <Navigation />
        <Hero backgroundImage={this.state.heroBanner} title={this.state.heroTitle} description={this.state.heroDescription} />
        <VideoContainer videoThumbnails={this.state.videoThumbnails} videoTitles={this.state.titles}  videoLikes={this.state.likes} videoTimes={this.state.times} videoCreateds={this.state.createds}/>
      </div>
    );
  }
}

export default App;