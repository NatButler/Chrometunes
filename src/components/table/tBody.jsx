import React, { Component } from 'react';
import { connect } from 'react-redux';
import TRow from './tRow';
import { getVisibleTracks } from '../../librarySearch'

class TBody extends Component {
	constructor() {
		super();
		this.state = {
			visibleTrackIds: []
		}
	}

	shouldComponentUpate(nextProps) { // Still rendering on playTrack when track isn't visible
		return this.props.currentTrack !== nextProps.currentTrack && this.state.visibleTrackIds.includes(nextProps.currentTrack.PId);
	}

	componentWillUpdate() {
		this.state.visibleTrackIds = [];
	}

	render() {
		console.log('Rendering TBody.');
		const props = this.props;
		const tracks = (props.query ? props.search : false) || (props.filtered.length ? props.filtered : false) || props.library;

		const rows = tracks.map( trk => {
			this.state.visibleTrackIds.push(trk.PId);
			let trClass = (props.currentTrack && props.currentTrack.PId === trk.PId) ? 'currentTrack' : '';
			return <TRow key={trk.PId} track={trk} libTracks={props.library} trClass={trClass} />
		});

		return <tbody>{rows}</tbody>;
	}
}

const mapStateToProps = state => ({
	library: state.library.tracks,
	filtered: state.library.filtered,
	search: state.library.search,
	query: state.library.query,
	currentTrack: state.playback.nowPlaying.track
	// visibleTracks: getVisibleTracks(state.library.tracks, state.library.artists)
});

export default connect(mapStateToProps)(TBody);