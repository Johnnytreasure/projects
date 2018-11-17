import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults'
import Spotify from '../../util/Spotify'

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(playlistTrack => {
      if (playlistTrack.id === track.id) {
      return;
      }
    }));
      const newPlaylistTracks = this.state.playlistTracks;
      this.state.playlistTracks.push(track);
       this.setState({playlistTracks: newPlaylistTracks});
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    let pos =  newPlaylistTracks.indexOf(track);
    if (pos >-1) {
      newPlaylistTracks.splice(pos, 1);
    }
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistTracks: []
    });
    this.updatePlaylistName('New Playlist');
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd= {this.addTrack}/>
            <Playlist playlistName ={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove= {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
