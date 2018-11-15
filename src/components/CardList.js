import React, { Component } from 'react';
import Card from './Card';
import '../containers/App.css';
import InfiniteScroll from "react-infinite-scroll-component";


class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pics: [],
      items: Array.from({ length: 20 }),
      hasMore: true
    }
  }

  


  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };


 
  render() {

   

    return !filteredpics.length ?
    <h1>Loading</h1> :
     (
      <div className='flex-wrap'>
          {
            this.props.filteredpics.map((pic, i) => {

              return (
                <Card
                  key={i} //?
                  title={this.props.pics[i].title}
                  author={this.props.pics[i].author}
                  description={this.props.pics[i].description}
                  tags={this.props.pics[i].tags}
                  media={this.props.pics[i].media.m}
                  link={this.props.pics[i].link}
                  authorID={this.props.pics[i].author_id}
                />
              );
            })

          }
      </div>
    );
  }
}

export default CardList;