import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
 constructor (props) {
    super(props)
  }
  handleSearch(event) {
    this.props.searchSpotify();
  }
  render () {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" />
        <a>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
