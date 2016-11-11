import React, { Component } from 'react';
import { Button } from './components';
import { search, lib } from '../library';
import { filterLib, filterGenre, setFilter, filter, clearSearch, setQuery } from '../actions/actions';

/**
 * text input / filter interaction needs addressing
 */
class Header extends Component {
	constructor({store}) {
		super();
		this.store = store;
		this.timer;
	}

	render() {
		const state = this.store.getState();

		let genreList = lib.genres.map( (genre, i) => {
			let selected = (genre == state.library.filter);
			return <option key={i} value={genre} selected={selected}>{genre}</option>
		});

		return (
			<nav className="navbar navbar-default">
				<img src="img/logo.png" alt="logo" className="logo" />
				
                <input
                	ref={node => {
                		this.input = node;
                	}}
                	type="text"
                	name="q"
                	id="q"
                	spellCheck="false"
                	autoComplete="off"
                	autoFocus="true"
                	placeholder={state.library.query}
                	onKeyUp={ () => {
                		this.handleSearch(this.input.value, this.select.value);
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
		        		this.store.dispatch( setFilter(this.select.value) );
		        		this.store.dispatch( filter(this.select.value, 'Genre', state.library.search) );
		        	}}
		        >
		        	<option value="">Library</option>
		        	{genreList}
		        </select>
			</nav>
		);
	}

	handleSearch(q, genreFilter) {
		clearTimeout( this.timer );
		if (!q.length) { 
			this.store.dispatch( clearSearch() );
			this.store.dispatch( filter(this.select.value, 'Genre', this.store.getState().library.search) );
		}
		else {
			this.timer = (q.length >= 3) && setTimeout( () => {
				let results = search(q);

				this.store.dispatch( setQuery(q) );

				if (genreFilter) {
					this.store.dispatch( filterLib( results ) );
					this.store.dispatch( filter( genreFilter, 'Genre', results ) );					
				}
				else {
					this.store.dispatch( filterLib( results ) );
				}
				
			}, 500);
		}
	}
}


export default Header