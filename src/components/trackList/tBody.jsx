import React, { Component } from 'react';
import { connect } from 'react-redux';
import TRow from './tRow';
import { trkSearch, trkFilter } from '../../librarySearch';
import { searchLib, filterLib } from '../../actions/actions';

class TBody extends Component {
	constructor() {
		super();
		this.state = {
			tracks: [],
			rows: {}
		}
	}
	
	componentWillReceiveProps(nextProps) {
		this.updateRow(this.props.currentTrack, nextProps.currentTrack);
	}

	shouldComponentUpdate(nextProps) {
		return (this.props.currentTrack !== nextProps.currentTrack) ? false : true;
	}

	componentWillUpdate(nextProps) {
		this.state.tracks = nextProps.filtered.length ? nextProps.filtered : nextProps.lib;
		if (nextProps.query) { this.state.tracks = trkSearch(this.state.tracks, nextProps.query); }
		this.state.rows = {};
	}

	updateRow(prev, next) {
		const state = this.state;
		if (prev) { if (state.rows[prev.PId]) { state.rows[prev.PId].className = ''; } }
		if (next) { if (state.rows[next.PId]) { state.rows[next.PId].className = 'currentTrack'; } }
	}

	render() {
		console.log('TBody.');
		const { currentTrack, lib, index } = this.props;
		const rows = this.state.tracks.map( (trk, i) => {
			let trClass = (currentTrack && currentTrack.PId === trk.PId) ? 'currentTrack' : '';
			return (
				<TRow 
					key={trk.PId} 
					ref={component => {
						if (component) { this.state.rows[trk.PId] = component.refs.row; }
					}}
					track={trk} 
					lib={lib} 
					index={index} 
					trClass={trClass}
				/>
			);
		});

		return <ul className="col-md-12 tbody">{rows}</ul>;
	}

	componentDidUpdate() {
		if (this.props.query) { this.props.onSearch(this.state.tracks); }
		// if (this.props.filter) { this.props.onFilter(this.state.tracks); }
	}
}

const mapStateToProps = state => ({
	lib: state.library.tracks,
	index: state.library.index,
	// filter: state.library.filter,
	filtered: state.library.filtered,
	query: state.library.query,
	currentTrack: state.playback.nowPlaying.track
});

export default connect(mapStateToProps, {
	onSearch: searchLib
})(TBody);