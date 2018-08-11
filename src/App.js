import React, { Component } from 'react';
import Hero from './Hero.jsx';
import './app.css';

const API = 'https://d6api.gaia.com/videos/term/119931';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroBanner: '',
      heroTitle: '',
      heroDescription: '',
      videoThumbnails: [],
      titles: [],

    };

    this.generateThumbnails = this.generateThumbnails.bind(this);
    this.generateTitles = this.generateTitles.bind(this);
    this.generateHeroImg = this.generateHeroImg.bind(this);
    this.generateHeroDescription = this.generateHeroDescription.bind(this);
    this.generateHeroTitle = this.generateHeroTitle.bind(this);
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
        titlesArr.push(title);
      }
      this.setState({ titles: titlesArr });
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
      let title = data.term.name;
      this.setState({ heroTitle: title });
    }

  componentDidMount() {
    fetch(API, {
      headers: { "Content-Type" : "application/json"}
    })
      .then(response => response.json())
      .then(data => {
        this.generateThumbnails(data);
        this.generateTitles(data);
        this.generateHeroImg(data);
        this.generateHeroDescription(data);
        this.generateHeroTitle(data);
      })
      .catch(error => console.error(error))
  }
  
  render() {
    {console.log('current state in initial render', this.state)}
    return (
      <div id="app">
        Hello WilburxFranklin!
      <Hero backgroundImage={this.state.heroBanner} title={this.state.heroTitle} description={this.state.heroDescription} />
      </div>
    );
  }
}

export default App;