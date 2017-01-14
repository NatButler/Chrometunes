import React, { Component } from 'react';
import { Button } from './components';
import { search, trkFilter, lib } from '../library';
import { filterLib, searchLib, clearSearch, clearFiltered } from '../actions/actions';
import * as filters from '../constants/filters';


class Header extends Component {
	constructor({store}) {
		super();
		this.store = store;
		this.timer;
	}

	render() {
		const state = this.store.getState();

		let genreList = lib.genres.map( (genre, i) => {
			let defaultVal = (genre == state.library.filter);
			return <option key={i} value={genre} defaultValue={defaultVal}>{genre}</option>
		});

		return (
			<nav className="navbar navbar-default">
				<img src="img/logo.png" alt="logo" className="logo" />
				
                <input
                	ref={node => {
                		this.searchInput = node;
                	}}
                	type="text"
                	name="q"
                	spellCheck="false"
                	autoComplete="off"
                	autoFocus="true"
                	onKeyUp={ () => {
                		this.handleSearch(this.searchInput.value);
                	}}
                />

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
		        >
		        	<option value="">Genre</option>
		        	{genreList}
		        </select>
			</nav>
		);
	}

	handleSearch(query) {
		let library = this.store.getState().library;
		clearTimeout( this.timer );

		if (!query) { // No query
			this.store.dispatch( clearSearch() );
			if (library.filter) { this.store.dispatch( searchLib(library.filtered, query) ); }
		}
		else { // New query
			this.timer = (query.length >= 3 && query != library.query) && setTimeout( () => {
				let results = search(query, library.filtered);
				if (!results) { this.store.dispatch( clearSearch() ); }
				else { this.store.dispatch( searchLib( results, query ) ); }
			}, 500);
		}
	}

	handleFilter(filter, query) {
		if (!filter) { // No filter, clear any filtered results from store
			this.store.dispatch( clearFiltered() );
			// If query, display associated results
			if (query) { this.store.dispatch( searchLib( search(query), query ) ); }
		}
		else { // New filter
			let results = trkFilter(filter, filters.GENRE);
			this.store.dispatch( filterLib(results, filter) );
			if (query) { // Re-query filtered results
				let newResults = search(query, results);
				if (newResults) { this.store.dispatch( searchLib(newResults, query) ); } // If query matches filtered results, display
				else { this.store.dispatch( searchLib(results, query) ); } // Else display filtered results
			}
			else { // Filter, no query
				this.store.dispatch( filterLib(results, filter) );
				this.store.dispatch( searchLib(results, query) );
			}
		}
	}
}


export default Header