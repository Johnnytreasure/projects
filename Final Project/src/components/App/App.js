import React from 'react';
import './app.css';
import SearchBar from '../SearchBar/Searchbar'

class App extends React.component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
        <SearchBar />
        </div>
      </div>
    )
  }
}
