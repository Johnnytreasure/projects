import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults'

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
          name: 'Tiny Dancer',
          artist: 'Elton John',
          album: 'Madman across the water',
          id: 111
        }],
      playlistName: ['Namey name'],
      playlistTracks: [{
        name: 'Tiny Dancer',
        artist: 'Elton John',
        album: 'Madman across the water',
        id: 111
      }],
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id !== track.id)) {
      return;
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd= {this.addTrack}/>
            <Playlist playlistName ={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove= {this.removeTrack}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
