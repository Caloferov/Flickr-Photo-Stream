import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='searchbox'>
      <input
        className='searchbox-input'
        type='search'
        placeholder='Search photos'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;