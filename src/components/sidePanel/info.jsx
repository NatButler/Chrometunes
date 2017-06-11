import React, { Component } from 'react';
import { connect } from 'react-redux';
// const jsmediatags = window.jsmediatags;

class Info extends Component {
	constructor() {
		super();
	}
	
	render() {
		console.log('Rendering Info.');
		const track = this.props.track;
		let info = <li className="alert">No track info available.</li>;

		if (track) {
			info = Object.keys(track).sort().map( (key, i) => {
				let prop = track[key];
				if (key === 'Disc') { prop = prop + ' / ' + track['Disc count']; }
				if (key === 'Disc count') { return; }
				if (key === 'Track') { prop = prop + ' / ' + track['TrackCount']; }
				if (key === 'TrackCount') { return; }
				if (key === 'Artwork') {
					if (prop) {
						const imgURL = this.buildImgURL(track.Location, track.Artist, track.Album);
						this.getArtwork(imgURL);
					} else {
						if (this.artwork) { this.artwork.src = '../img/artwork.jpg'; }
					}
					return (
						<li key={i} className={this.repSpace(key, '-').toLowerCase()}>
							<img ref={node => {this.artwork = node}} className="artwork img-thumbnail" src={'../img/artwork.jpg'} />
						</li>
					);
				}
				if (key === 'PId') { return <li key={i} className="divider"></li>; }
				if (key === 'TrackCount') { key = 'Track count'; }
				if (key === 'Location') { return; }
				return <li key={i} className={this.repSpace(key, '-').toLowerCase()}><span className="infoKey">{key}:</span> {prop}</li>;
			});
		}

		return (
			<div id="info" className="tab-pane" role="tab-pane">
				<ul>{info}</ul>
			</div>
		);
	}

	repSpace(key, char) {
		return key.replace(/ /g, char);
	}

	buildImgURL(loc, art, alb) {
		return this.props.server + loc.slice(loc.indexOf('iTunes'), loc.lastIndexOf('/')+1) + this.repSpace((art + ' - ' + alb), '%20') + '.jpg';
	}

	getArtwork(url) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'blob';
		xhr.onload = e => {
			if (e.target.status === 200) {
				this.artwork.src = window.URL.createObjectURL(e.target.response); 
			} else {
				this.artwork.src = '../img/artwork.jpg';
			}	
		}
		xhr.send();
	}
}

const mapStateToProps = state => ({
	track: state.playback.nowPlaying.track,
	server: state.app.serverAdd
});

export default connect(mapStateToProps)(Info);