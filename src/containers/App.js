import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import "@babel/polyfill";


// IE "Includes" Polyfill

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      pics: [],
      searchfield: ''
    }
  }
  
componentDidMount() {
  var extractedJson = [];
  fetch("https://cors-proxy.htmldriven.com/?url=https://api.flickr.com/services/feeds/photos_public.gne?format=json")
    .then(response => { return response.json() })
    .then(data => {
      var jsonp = data.body;
      
      // parse/filter `jsonp`'s value if necessary here

      var f = new Function("jsonFlickrFeed", jsonp);
      f( 
        function (json) {
           extractedJson = json.items 
          });
      this.setState({ pics: extractedJson })
    });
}

onSearchChange = (event) => {
  this.setState({ searchfield: event.target.value })
}

render() {
  const { pics, searchfield } = this.state;
  const filteredpics = pics.filter(pic => {
    return pic.tags.toLowerCase().includes(searchfield.toLowerCase());
  })
  return !pics.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <div className="flex-row">
          <h1 className='logo-title'>Flick Photo Stream</h1>
          <SearchBox searchChange={this.onSearchChange} />
        </div>
        <CardList pics={filteredpics} />
      </div>
    );
}
}

export default App;