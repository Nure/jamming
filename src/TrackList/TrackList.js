
import React, { Component } from 'react';
import Track from '../Track/Track';

class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.track.map(track => {
                        return
                        <Track
                            key={this.props.id}
                            track={this.props.name}
                            artist={this.props.artist}
                            album={this.props.album}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                        />
                    })}
                }}
            </div>
        );
    }
}

export default Track;
