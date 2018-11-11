import React from 'react';
import LazyLoad from 'react-lazyload';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import '../containers/App.css';

const Card = ({ key, title, author, description, tags, media, link, authorID }) => {
  var descr = description;

  var tagsSplitted = tags.split(' ');
  var tagsJoinedByComma = tagsSplitted.join(', ');

  var authorSplitted = author.split('\"');


  var authorPage = "https://www.flickr.com/people/" + authorID;
  return (
    <LazyLoad height={360} offset={100} once >
      <div className='bw2 card'>

        <div className="pic-container">
          <img className="pic" alt='Flickr pic' src={media} />
        </div>

        <div className="title-and-author">
          <a href={link} className="title ">{title}</a>
         <p className="">&nbsp;by&nbsp;</p> 
        <a href={authorPage} className="author">{authorSplitted[1]}</a>
        </div>

        {/* <div className="description-overflow">
        {ReactHtmlParser(descr)}
             </div> */}
        <div className="description-overflow">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cumque similique illo esse aspernatur consequatur. Commodi a veritatis quidem asperiores expedita exercitationem non maxime quam. Officia vero eligendi iure illum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sed est facere fugiat nobis? Delectus voluptatum nam aliquam itaque fugiat omnis optio labore, maxime cum illum saepe. Voluptates, atque accusamus!
        </div>
        <p className="description-overflow zero-bottom-margin">Tags: {tagsJoinedByComma}</p>
      </div>
    </LazyLoad>

  );
}

export default Card;
