import React from 'react';
import Card from './Card';
import '../containers/App.css';

const CardList = ({ pics }) => {
  return (
    <div className='flex-wrap'>
      {
        pics.map((pic, i) => {
          return (
            <Card
              key={i} //?
              title={pics[i].title}
              author={pics[i].author}
              description={pics[i].description}
              tags={pics[i].tags}
              media={pics[i].media.m}
              link={pics[i].link}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;