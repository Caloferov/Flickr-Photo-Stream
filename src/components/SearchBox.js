import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='searchbox'>
      <input
        className='searchbox-input tc'
        type='search'
        placeholder='Search by tags'
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;