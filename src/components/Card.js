import React from 'react';
import LazyLoad from 'react-lazyload';
import '../containers/App.css';

const Card = ({ key, title, author, description, tags, media, link, authorID }) => {
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

        <div className="">
          <p className="description-overflow">{stripNSlice(description)}</p>
        </div>

        <p className="tags zero-bottom-margin">{tagsJoinedByComma}</p>

      </div>
    </LazyLoad>
  );
}

function stripNSlice(html) {
  var temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  var descr = temporalDivElement.children.length > 2 ? temporalDivElement.children[2].innerText : "There is no description.";

  if  (descr.length > 123) {
   descr = descr.substring(0,120) + "...";
  }
  return descr;
}

export default Card;
