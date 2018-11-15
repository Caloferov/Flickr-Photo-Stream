import React from 'react';
import LazyLoad from 'react-lazyload';
import '../containers/App.css';

const Card = ({ title, author, description, tags, media, link, authorID }) => {
  var authorSplitted = author.split('"');
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
          <p className="description">{stripAndSlice(description)}</p>
        </div>
        <p className="tags zero-bottom-margin">{SplitAndJoin(tags)}</p>
      </div>
    </LazyLoad>
  );
}

// Functions 
function SplitAndJoin(tags) {
  var tagsSplitted = tags.split(' ');
  var tagsJoinedByComma;
  if (tags.length < 1) {
    tagsJoinedByComma = "There are no tags."
  }
  else {
    tagsJoinedByComma = "Tags: " + tagsSplitted.join(', ');
  }
  return tagsJoinedByComma;
}
function stripAndSlice(html) {
  var temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  var descr = temporalDivElement.children.length > 2 ? temporalDivElement.children[2].innerText : "There is no description.";

  if (descr.length > 128) {
    descr = descr.substring(0, 125) + "...";
  }
  return descr;
}

export default Card;
