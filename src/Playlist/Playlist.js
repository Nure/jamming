import React, {Component} from 'react';
import TrackList from '../TrackList/TrackList'
import './Playlist.css'

class Playlist extends Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){
      const name = event.target.value;
      this.props.onNameChange(name);
  }
  render () {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
