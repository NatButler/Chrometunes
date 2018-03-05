import React, { Component } from 'react';
import { connect } from 'react-redux';
import TRow from './tRow';
import Alert from '../Alert';
import { trkSearch } from '../../librarySearch';
import { loadLibrary, searchLib } from '../../actions/actions';

class TBody extends Component {
	constructor() {
		super();
		this.tbody;
		this.state = {
			tracks: [],
			rows: {},
			rowsIdx: []
		};
		this.scroll = {
			start: 0,
			range: 500,
			// rowH: 16,
			up: 800,
			down: 8000,
			amount: 250
		};
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
		this.state.start = 0;
	}

	updateRow(prev, next) {
		const state = this.state;
		if (prev) { if (state.rows[prev.PId]) { state.rows[prev.PId].id = ''; } }
		if (next) { if (state.rows[next.PId]) { state.rows[next.PId].id = 'currentTrack'; } }
	}

	render() {
		console.log('TBody.');
		const { currentTrack, lib, index, alert } = this.props;
		const alertBox = alert ? <Alert type="danger" msg={alert} action="Load library" handler={this.props.onLoadLib} /> : null;
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
				onScroll={() => { 
					if (this.state.rowsIdx.length > this.scroll.range) {
						this.handleScrolling(this.tbody.scrollTop);
					} 
				}}
			>
				{alertBox || rows}
			</ul>
		);
	}

	handleScrolling(pos) {
		const showHide = (range, action) => {
			for (let i = range[0]; i < range[1]; i++) {
				this.state.rows[this.state.rowsIdx[i]].className = action;
			}
		}

		if (pos > this.scroll.down) {
			const {start, range, amount} = this.scroll;
			const end = start + range;
			const len = amount <= this.state.rowsIdx.length - end ? amount : this.state.rowsIdx.length - end;
			showHide([start, start+amount], 'hidden');
			showHide([end, end+len], '');
			this.scroll.start = start + amount;
		}

		if (pos < this.scroll.up && this.scroll.start > 0) {
			const {start, range, amount} = this.scroll;
			const end = start + range;
			const len = amount > this.state.rowsIdx.length - end ? this.state.rowsIdx.length - end : amount;
			showHide([start-amount, start], '');
			showHide([end-amount, end-amount+len], 'hidden');
			this.scroll.start = start - amount;
		}
	}

	componentDidUpdate() {
		this.tbody.scrollTop = 0;
		const len = this.state.rowsIdx.length < this.scroll.range ? this.state.rowsIdx.length : this.scroll.range;
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
	currentTrack: state.playback.nowPlaying.track,
	alert: state.library.alert
});

export default connect(mapStateToProps, {
	onLoadLib: loadLibrary,
	onSearch: searchLib
})(TBody);