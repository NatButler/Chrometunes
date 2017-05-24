import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from './components';
import Playback from './playback';
import { trkSearch, trkFilter } from '../librarySearch';
import { importLib, filterLib, searchLib, clearSearch, clearFiltered } from '../actions/actions';
import * as filters from '../constants/filters';
import { loadLibrary } from '../libraryLoad';

class Header extends Component {
	constructor() {
		super();
		this.timer;
	}

	// componentDidMount() {
	// 	const { store } = this.context;
	// 	this.unsubscribe = store.subscribe( () =>
	// 		this.forceUpdate()
 //    );
	// }

	// componentWillUnmount() {
	// 	this.unsubscribe();
	// }

	render() {
		const { store } = this.context;
		const state = store.getState();

		let defaultFilter;
		if (state.library.filterType === filters.ALBUM || state.library.filterType === filters.ARTIST) {
			defaultFilter = '[ ' + state.library.filterType + ' ]';
		} else {
			defaultFilter = filters.GENRE;
		}
		let genreList = state.library.genres.map( (genre, i) => {
			return <option key={i} value={genre}>{genre}</option>;
		});

		// <img src="img/logo.png" alt="logo" className="logo" />
		
		return (
			<nav className="navbar navbar-default">
				<button is="google-cast-button" id="cast-button"></button>
				<Playback />

				<select
					ref={node => {
						this.select = node;
					}}
					name="genres"
					className="form-inline"
					id="genres"
					onChange={ () => { 
						this.handleFilter(this.select.value, this.searchInput.value);
					}}
					value={state.library.filter}
				>
					<option value="">{defaultFilter}</option>
					{genreList}
				</select>

        <input
					ref={node => {
						this.searchInput = node;
					}}
					type="text"
					name="q"
					// placeholder="Search"
					spellCheck="false"
					autoComplete="off"
					autoFocus="true"
					onKeyUp={ () => {
						if (this.searchInput.value !== state.library.query) {
							this.handleSearch(this.searchInput.value);
						}
					}}
        />

				<Button
					className="menu"
					icon="option-vertical"
					handler={ () => {
						console.log('Menu clicked.');
					}}
				/>
			</nav>
		);
	}

	handleSearch(query) {
		const { store } = this.context;
		let library = store.getState().library;
		clearTimeout( this.timer );

		if (!query) { store.dispatch( clearSearch() ); }
		else {
			this.timer = (query.length >= 3) && setTimeout( () => {
				let results = library.filter ? trkSearch(query, library.filtered) : trkSearch(query, library.tracks);
				if (!results) { store.dispatch( clearSearch() ); }
				else { store.dispatch( searchLib(results, query) ); }
			}, 200);
		}
	}

	handleFilter(filter, query) {
		const { store } = this.context;
		const tracks = store.getState().library.tracks;

		if (!filter) {
			store.dispatch( clearFiltered() );
			if (query) { this.handleSearch(query); }
		} else {
			store.dispatch( filterLib( trkFilter(filter, filters.GENRE, tracks), filter, filters.GENRE) );
			if (query) { this.handleSearch(query); }
		}
	}
}

Header.contextTypes = {
	store: PropTypes.object
}

export default Header;