import React, { Component } from 'react';
import { connect } from 'react-redux';
import TRow from './tRow';
import { trkSearch, trkFilter } from '../../librarySearch';
import { loadLibrary, searchLib, filterLib } from '../../actions/actions';

class TBody extends Component {
	constructor() {
		super();
		this.tbody;
		this.state = {
			tracks: [],
			rows: {},
			rowsIdx: [],
			start: 0
		}
		this.maxVis = 1000;
	}
	
	componentWillReceiveProps(nextProps) {
		this.updateRow(this.props.currentTrack, nextProps.currentTrack);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.currentTrack === nextProps.currentTrack;
	}

	componentWillUpdate(nextProps) {
		this.state.tracks = nextProps.filtered.length ? nextProps.filtered : nextProps.lib;
		if (nextProps.query) { this.state.tracks = trkSearch(this.state.tracks, nextProps.query); }
		this.state.rows = {};
		this.state.rowsIdx = [];
		this.tbody.scrollTop = 0;
		this.state.start = 0;
	}

	updateRow(prev, next) {
		const state = this.state;
		if (prev) { if (state.rows[prev.PId]) { state.rows[prev.PId].id = ''; } }
		if (next) { if (state.rows[next.PId]) { state.rows[next.PId].id = 'currentTrack'; } }
	}

	render() {
		console.log('TBody.');
		const { currentTrack, lib, index } = this.props;
		const alert = <li className="alert alert-danger" role="alert">Library not loaded.&nbsp;<a href="#" className="alert-link" onClick={e => { this.props.onLoadLib(); e.preventDefault(); }}>Click to load library.</a></li>;
		const rows = this.state.tracks.map( (trk, i) => {
			const cTrackId = (currentTrack && currentTrack.PId === trk.PId) ? 'currentTrack' : '';
			let trClass = '';
			this.state.rowsIdx.push(trk.PId);
			if (i > 1000) { trClass = 'hidden'; }

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
					id={cTrackId}
				/>
			);
		});

		return (
			<ul
				ref={node => { this.tbody = node; }}
				className="col-md-12 tbody"
				onScroll={() => { this.handleScroll(); }}
			>
				{lib.length ? rows : alert}
			</ul>
		);
	}

	handleScroll() {
		if (this.state.rowsIdx.length > this.maxVis) {
			const state = this.state;
			const rH = 16;
			const scrollDown = this.maxVis * rH;
			const scrollUp = 50 * rH;
			const range = 999;
			const amount = 500;
			const len = (amount <= state.rowsIdx.length - (state.start + range)) ? amount : state.rowsIdx.length - (state.start + range);
			// const rV = Math.ceil((this.tbody.clientHeight / rH), 10);

			if (this.tbody.scrollTop > scrollDown) {
				for (let i = state.start; i < state.start + amount; i++) {
					state.rows[state.rowsIdx[i]].className = 'hidden';
				}
				for (let i = state.start + range; i < state.start + range + len; i++) {
					state.rows[state.rowsIdx[i]].className = '';
				}
				state.start = state.start + amount;
			}

			if (this.tbody.scrollTop < scrollUp && state.start > 0) {
			 state.start = state.start - amount;
				for (let i = state.start; i < state.start + amount; i++) {
					state.rows[state.rowsIdx[i]].className = '';
				}
				for (let i = state.start + range; i < state.start + range + len; i++) {
					state.rows[state.rowsIdx[i]].className = 'hidden';
				}
			}
		}
	}

	componentDidUpdate() {
		const len = this.state.rowsIdx.length < this.maxVis ? this.state.rowsIdx.length : this.maxVis;
		for (let i = 0; i < len; i++) {
			this.state.rows[this.state.rowsIdx[i]].className = '';
		}
		if (this.props.query) {
			this.props.onSearch(this.state.tracks);
		}
	}
}

const mapStateToProps = state => ({
	lib: state.library.tracks,
	index: state.library.index,
	filtered: state.library.filtered,
	query: state.library.query,
	currentTrack: state.playback.nowPlaying.track
});

export default connect(mapStateToProps, {
	onLoadLib: loadLibrary,
	onSearch: searchLib
})(TBody);