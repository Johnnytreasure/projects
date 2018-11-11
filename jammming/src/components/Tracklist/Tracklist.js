import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

class Tracklist extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    if (this.props.tracks){
      return (
        <div className="TrackList">
          {
            this.props.tracks.map(track => {
              return <Track track={track} key={track.id} onAdd ={this.props.onAdd}
              onRemove= {this.props.onRemove} isRemoval= 'true'/>;
            })
          }
        </div>
      );
    } else {
      return <div className="TrackList"/>;
    }
  }
};

export default Tracklist;
