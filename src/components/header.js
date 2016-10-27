import React from 'react';
import { Button } from './components';
import { search } from '../library';
import { skipTrack, playTrack, filterLib, filterGenre } from '../actions/actions';

const { Component } = React;


class Header extends Component {
	constructor({store}) {
		super();
		this.store = store;
		this.timer;
	}

	render() {
		const state = this.store.getState();
		let genreList = state.library.genres.map( (genre, i) => {
			return <option key={i} value={genre}>{genre}</option>
		});

		return (
			<nav className="navbar navbar-default">
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
			        		this.store.dispatch({
			        			type: 'SET_FILTER',
			        			filter: this.select.value
			        		});
			        	}}
			        >
			        	<option defaultValue="" value="">Genres</option>
			        	{genreList}
			        </select>

	                <div id="controls">
						<Button
					        className={'btn btn-default ' + state.playmode} 
							icon="step-forward"
							disabled={!state.upnext.length ? 'disabled' : ''}
							handler={ () => {
				              	this.store.dispatch( playTrack(state.playmode, state.upnext[0]) );
				              	this.store.dispatch( skipTrack(state.playmode) );
			            	}}
						/>

						<Button
					        className={'btn btn-default ' + state.playmode}
				        	icon={(state.playmode == 'normal') ? 'repeat' : state.playmode + ' text-success'}
				        	handler={ () => {
				            	this.store.dispatch({ type: 'SET_PLAYMODE' });
				        	}}
						/>
					</div>
			</nav>
		);
	}

	handleSearch(q, filter) {
		clearTimeout( this.timer );
		if (!q.length) { this.store.dispatch( filterLib() ) }
		else {
			this.timer = (q.length >= 3) && setTimeout( () => {
				this.store.dispatch( filterLib(search(q, filter)) );
			}, 500);
		}
	}
}

// const GenreSelect = ({store, genres}) => {
// 	// <GenreSelect store={this.store} genres={state.library.genres} />
// 	let select, genreList = genres.map( (genre, i) => {
// 		return <option key={i} value={genre}>{genre}</option>
// 	});
// 	return (
//         <select 
//         	ref={node => {
//         		select = node;
//         	}}
//         	name="genres"
//         	className="form-inline"
//         	id="genres"
//         	onChange={ () => {
//         		store.dispatch( filterGenre(select.value) )
//         	}}
//         >
//         	<option defaultValue="">Genres</option>
//         	{genreList}
//         </select>
// 	);
// }

export default Header