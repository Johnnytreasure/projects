import React from 'react';
import './SearchBar.css';

class SearchBar extends React.component {
  constructor (props) {
    super(props)
  }
  handleSearch(event) {
    this.props.searchSpotify();
  }
  render () {
    return (
      <div class="SearchBar">
        <input placeholder="Enter A Song Title" />
        <a>SEARCH</a>
      </div>
    )
  }
}

export default Searchbar;
