import React, { Component } from 'react';
import Card from '../components/Card';
import SearchBox from '../components/SearchBox';
import './App.css';
import "@babel/polyfill";
import InfiniteScroll from "react-infinite-scroll-component";


// IE "Includes" Polyfill

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
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
      searchfield: '',
      items: Array.from({ length: 20 })
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

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
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
      this.setState({ pics: this.state.pics.concat(extractedJson)})
    });
  };

  render() {
    const { pics, searchfield } = this.state;

    const filteredpics = pics.filter(pic => {
      return pic.tags.toLowerCase().includes(searchfield.toLowerCase());
    })

    return (<div className='tc'>
      <div className="flex-row">
        <h1 className='logo-title'>Flick Photo Stream</h1>
        <SearchBox searchChange={this.onSearchChange} />
      </div>
      <div className='flex-wrap'>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {
            filteredpics.map((pic, i) => {

              return (
                <Card
                  key={i} //?
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

export default App;