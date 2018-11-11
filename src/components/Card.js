import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import '../containers/App.css';

const Card = ({ key, title, author, description, tags, media, link }) => {
  var descr = description;
  var tagsSplitted = tags.split(' ');
  var tagsJoinedByComma = tagsSplitted.join(', ');
  return (
    <div className='bg-light-green bw2 shadow-5 card'>

      <div className="pic-container">
        <img className="pic" alt='Flickr pic' src={media} />
      </div>

      <p className="title-and-author">
        <a href={link}><span className="title">{title}</span></a>
        &nbsp;by&nbsp;
        <a href={author}><span className="">{author}</span></a>
      </p>
      {/* <div className="description-overflow">
        {ReactHtmlParser(descr)}
             </div> */}
      <div className="description-overflow">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cumque similique illo esse aspernatur consequatur. Commodi a veritatis quidem asperiores expedita exercitationem non maxime quam. Officia vero eligendi iure illum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates sed est facere fugiat nobis? Delectus voluptatum nam aliquam itaque fugiat omnis optio labore, maxime cum illum saepe. Voluptates, atque accusamus!
        </div>
      <p className="description-overflow zero-bottom-margin">Tags: {tagsJoinedByComma}</p>


    </div>


  );
}

export default Card;
