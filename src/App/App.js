import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../util/Spotify';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
           searchResults : [
             {name: "name"},
             {artist: "artist"},
             {album: "album"},
             {id: "id"}
           ],
           playlistName : "JTList",
           playlistTracks : [
             {name: "name"},
             {artist: "artist"},
             {album: "album"},
             {id: "id"}
           ]
       };
       this.addTrack = this.addTrack.bind(this);
       this.removeTrack = this.removeTrack.bind(this);
       this.updatePlaylistName = this.updatePlaylistName.bind(this);
       this.savePlaylist = this.savePlaylist.bind(this);
       this.search = this.search.bind(this);
    }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
       return;
      }
    this.state.playlist.push(track);   //does this add track to playlist???
  }

  removeTrack(track){
    let myVar = this.state.playlistTracks.filter(savedTrack =>
      savedTrack.id === track.id
    );

    this.setState({playlistTracks : myVar})
  }

  updatePlaylistName(name)  {
    this.setState({playlistName : name})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map();
      ///CHECK THIS  step 63
    }

  search(term){
    console.log('HIYA   App Search');
    console.log(term);
    Spotify.getAccessToken();
    Spotify.search(term).then(tracks => {
      this.setState({tracks: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
