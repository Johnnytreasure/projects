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
    let alreadyExist=false;
    if (this.state.playlistTracks.find(playlistTrack => {
      if (playlistTrack.id === track.id) {
      let alreadyExist=true;
      return;
      }
    }));
    if (!alreadyExist) {
      const newPlaylistTracks = this.state.playlistTracks;
      this.state.playlistTracks.push(track);
       this.setState({playlistTracks: newPlaylistTracks});
       const newfilteredResults= this.state.searchResults.filter(searchResult => {
        const filteredPlaylist = this.state.playlistTracks.filter(track => track.id === searchResult.id);
         return (filteredPlaylist.length == 0)
       });
       this.setState({filteredPlaylist: newfilteredResults});
    }
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks;
    let pos =  newPlaylistTracks.indexOf(track);
    if (pos >-1) {
      newPlaylistTracks.splice(pos, 1);
    }
    this.setState({playlistTracks: newPlaylistTracks});
    let newfilteredResults = this.state.searchResults.filter(searchResult =>{
      let x = this.state.playlistTracks.filter(track => track.id === searchResult.id);
      return (x.length == 0)
    });
    this.setState({filteredResults: newfilteredResults});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({playlistTracks: [], PlaylistName: 'New Playlist'});
    let newfilteredResults = this.state.searchResults;
    this.setState({filteredResults: newfilteredResults});
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
