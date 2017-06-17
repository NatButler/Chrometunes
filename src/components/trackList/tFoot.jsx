import React, { Component } from 'react';
import { connect } from 'react-redux';

class TFoot extends Component {
	shouldComponentUpdate(nextProps) {
		return true;
	}

	render() {
		console.log('TFoot.');
		const props = this.props;
		const filter = props.filter ? ` [${props.filterType}] ${props.filter}` : ' ALL';
		const query = props.query ? ` : "${props.query}"` : '';
		const trackCount = (props.query ? props.search.toString() : false) || props.filtered || props.lib;
		const mode = props.playmode.replace(/^[a-z]/, str => { return str.toUpperCase(); });

		return ( 
			<footer className="col-md-9 tfoot">
				<ul>
					<li className="track-count">{trackCount} tracks</li>
					<li className="play-mode">{mode}</li>
					<li className="filter-info"><h4>Filter: </h4>{filter}{query}</li>
				</ul>
			</footer>
		);
	}
}

const mapStateToProps = state => ({
	lib: state.library.tracks.length,
	query: state.library.query,
	search: state.library.search.length,
	filter: state.library.filter,
	filterType: state.library.filterType,
	filtered: state.library.filtered.length,
	playmode: state.playback.nowPlaying.mode
});

export default connect(mapStateToProps)(TFoot);