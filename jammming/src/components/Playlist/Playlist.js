import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';

class Playlist extends React.Component {
  render() {
    return (
        <div className="Playlist">
          <input value='New Playlist' playlistName={this.props.PlaylistName}/>
          <Tracklist playlistTracks={this.props.playlistTracks} onRemove= {this.props.onRemove} isRemoval= 'true'/>
          <a className="Playlist-save">SAVE TO SPOTIFY</a>
        </div>
    )
  }
}

export default Playlist;
