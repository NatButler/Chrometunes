import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Playback from './playback';
import Menu from './menu';
import { filterLib, searchLib, clearSearch, clearFiltered } from '../../actions/actions';
import { trkSearch } from '../../librarySearch';

class NavBar extends Component {
	constructor() {
		super();
		this.timer;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.filter !== nextProps.filter || this.props.query !== nextProps.query;
	}

	render() {
		console.log('Rendering NavBar.');
		const props = this.props;
		const genreList = props.genres.map( (genre, i) => {
			return <option key={i} value={genre}>{genre}</option>;
		});

		return (
			<nav className="navbar navbar-default">
				<button is="google-cast-button" id="cast-button"></button>

				<Playback />

				<select
					ref={node => { this.select = node; }}
					name="genres"
					className="form-inline"
					id="genres"
					onChange={ () => { 
						this.handleFilter(this.select.value);
					}}
					value={props.filter}
				>
					<option value="">{'[ ' + props.filterType + ' ]'}</option>
					{genreList}
				</select>

        <input
					ref={node => { this.searchInput = node; }}
					type="text"
					id="searchInput"
					name="q"
					// placeholder="Search"
					spellCheck="false"
					autoComplete="off"
					autoFocus="true"
					onKeyUp={ () => {
						if (this.searchInput.value !== props.query) {
							this.handleSearch(this.searchInput.value);
						}
					}}
					onSubmit={ () => {
						console.log(this.searchInput.value);
					}}
        />

				<Menu />
			</nav>
		);
	}

	handleSearch(query) {
		const { store } = this.context;
		const props = this.props;
		clearTimeout( this.timer );
		if (!query) { store.dispatch( clearSearch() ); }
		else {
			this.timer = (query.length >= 3) && setTimeout( () => {
				console.time('trkSearch');
				let results = props.filter ? trkSearch(props.filtered, query) : trkSearch(props.tracks, query);
				console.timeEnd('trkSearch');
				if (!results) { store.dispatch( clearSearch() ); }
				else { store.dispatch( searchLib(results, query) ); }
			}, 200);
		}
	}

	handleFilter(filter) {
		const { store } = this.context;
		const props = this.props
		if (!filter) {
			store.dispatch( clearFiltered() );
			if (props.query) { this.handleSearch(props.query); }
		} else {
			store.dispatch( filterLib(props.tracks, filter) );
			if (props.query) { this.handleSearch(props.query); }
		}
	}
}

NavBar.contextTypes = {
	store: PropTypes.object
}

const mapStateToProps = state => ({
	tracks: state.library.tracks,
	filterType: state.library.filterType,
	filter: state.library.filter,
	filtered: state.library.filtered,
	query: state.library.query,
	genres: state.library.genres
});

export default connect(mapStateToProps)(NavBar);