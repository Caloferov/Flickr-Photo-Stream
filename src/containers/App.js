import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import { photos } from '../photos.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      pics: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response=> response.json())
    //   .then(users => {this.setState({ pics: users})});

    this.setState({ pics: photos })
    console.log(photos);
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
          <div className="flex-wrap">
            <h1 className=''>Flick Photo Stream</h1>
            <SearchBox searchChange={this.onSearchChange} />
          </div>


          <CardList pics={filteredpics} />
        </div>
      );
  }
}

export default App;