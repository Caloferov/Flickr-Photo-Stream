import React, { Component } from 'react';
import Card from '../components/Card';
import SearchBox from '../components/SearchBox';
import './App.css';
import "@babel/polyfill";
import InfiniteScroll from "react-infinite-scroll-component";

var ApiUrl = "https://cors-proxy.htmldriven.com/?url=https://api.flickr.com/services/feeds/photos_public.gne?format=json"

class App extends Component {
  constructor() {
    super()
    this.state = {
      pics: [],
      searchfield: '',
      items: Array.from({ length: 20 })
    }
  }

  componentDidMount() {
    getApiResource(ApiUrl, this);
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1000);

    getApiResource(ApiUrl, this)
  };

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { pics, searchfield } = this.state;

    //"Search by tags"
    const filteredpics = pics.filter(pic => {
      return pic.tags.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (
      <div className='tc'>
        <div className="flex-row tc">
          <h1 className='logo-title'>Flickr Photo Stream</h1>
          <SearchBox searchChange={this.onSearchChange} />
        </div>
        <div className='flex-wrap'>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            }
          >
            {
              filteredpics.map((pic, i) => {
                return (
                  <Card
                    key={i} // In case you need an unique ID
                    title={filteredpics[i].title}
                    author={filteredpics[i].author}
                    description={filteredpics[i].description}
                    tags={filteredpics[i].tags}
                    media={filteredpics[i].media.m}
                    link={filteredpics[i].link}
                    authorID={filteredpics[i].author_id}
                  />
                );
              })
            }
          </InfiniteScroll>
        </div>
      </div>)
  }
}

//Funtions
function parseJsonp(data, current) {
  var jsonp = data.body;
  var extractedJson = [];

  // parse/filter `jsonp`'s value here if necessary 
  var f = new Function("jsonFlickrFeed", jsonp);
  f(
    function (json) {
      extractedJson = json.items
    });
  current.setState({ pics: current.state.pics.concat(extractedJson) })
}

function getApiResource(url, current) {
  fetch(url)
    .then(response => { return response.json() })
    .then(data => {
      parseJsonp(data, current)
    }
    );
}
export default App;