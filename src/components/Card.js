import React from 'react';
import LazyLoad from 'react-lazyload';
import '../containers/App.css';
import Ellipsis from 'ftellipsis';

const Card = ({ key, title, author, description, tags, media, link, authorID }) => {
  var element = document.getElementById('my-element');
  var ellipsis = new Ellipsis(element);
  
  ellipsis.calc();
  ellipsis.set();


  var tagsSplitted = tags.split(' ');
  var tagsJoinedByComma;
  if (tags.length < 1) {
    tagsJoinedByComma = "There are no tags."
  }
  else {
    tagsJoinedByComma = "Tags: " + tagsSplitted.join(', ');
  }

  var authorSplitted = author.split('\"');
  var authorPage = "https://www.flickr.com/people/" + authorID;

  return (
    <LazyLoad height={360} >
      <div className='card'>

        <div className="pic-container">
          <img className="pic" alt='Flickr pic' src={media} />
        </div>

        <div className="title-and-author">
          <a href={link} className="title ">{title}</a>
          <p className="">&nbsp;by&nbsp;</p>
          <a href={authorPage} className="author">{authorSplitted[1]}</a>
        </div>

        <div className="description-overflow">      
          {stripHtml(description)} 
        </div>

        <p className="tags zero-bottom-margin">{tagsJoinedByComma}</p>

      </div>
    </LazyLoad>
  );
}

function stripHtml(html) {
  var temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  return temporalDivElement.children.length > 2 ? temporalDivElement.children[2].innerText : "There is no description.";
}

export default Card;
