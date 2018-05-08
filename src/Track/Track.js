import React, { Component } from 'react';
import './Track.css'

class Track extends Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.state = {playing:false};
  }

  renderAction() {
    if(this.props.isRemoval){
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }
  renderPreview() {
    if (this.props.track.previewUrl) {
      return (
          <div className="Track-preview">
          <a onClick={this.togglePlay}><i className="material-icons">{this.state.playing? "pause_circle_filled" : "play_circle_filled"}</i></a>
          <audio id={"Audio" + this.props.track.uri} ref={(audio) => { this.audio = audio }} src={this.props.track.previewUrl} preload="none" />
          </div>
        );
    } else return
  }

  togglePlay() {
    if (this.state.playing) {
      this.setState({ playing: false });
      this.audio.pause();
    } else {
      this.setState({ playing: true });
      this.audio.play();
    }
  }

  addTrack(){
   this.props.onAdd(this.props.track);
    }
  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        {this.renderPreview()}
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
