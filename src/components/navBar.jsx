import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Button from './Button';
import Playback from './playback';
import { trkSearch, trkFilter } from '../librarySearch';
import { importLib, filterLib, searchLib, clearSearch, clearFiltered, saveList, setPlaymode } from '../actions/actions';
import * as filters from '../constants/filters';
import * as playmodes from '../constants/playModes';
import { loadLibrary } from '../libraryLoad';

class NavBar extends Component {
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

        <div className="dropdown">
					<Button
						className="dropdown-toggle btn btn-secondary"
						id="dropdownMenuButton"
						dataToggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
						icon="option-vertical"
						handler={ () => {
						
						}}
					/>
					<ul
						className="dropdown-menu dropdown-menu-right"
						aria-labelledby="dropdownMenu1"
					>
				  	<MenuItem
				  		title="Load library"
				  		handler={e => {
				  			loadLibrary(); 
				  			e.preventDefault(); 
				  		}}
				  	/>
				  	<MenuItem
				  		title="Load playlist"
				  		status={!state.playlists.length ? 'disabled' : ''}
				  		handler={e => { 
				  			console.log('Show "Playlists" tab.'); 
				  			e.preventDefault(); 
				  		}}
				  	/>
						<MenuItem
				  		title="Save playlist"
				  		status={!state.upnext.length ? 'disabled' : ''}
				  		handler={e => { 
						  	this.searchInput.focus();
				  			// store.dispatch( saveList(state.upnext, state.playback.track, title) ) 
				  			e.preventDefault(); 
				  		}}
				  	/>
				  	<li role="separator" className="divider"></li>
				  	<li className="dropdown-submenu">
					    <a className="dropdown-item" href="#">Playmode</a>
    					<ul className="dropdown-menu dropdown-menu-right">
    						<MenuItem
						  		title="Repeat"
						  		status={state.playback.mode === playmodes.REPEAT ? 'selected' : ''}
						  		handler={e => { 
						  			store.dispatch( setPlaymode(playmodes.REPEAT) ); 
				  					e.preventDefault(); 
						  		}}
						  	/>
								<MenuItem
						  		title="Repeat 1"
						  		status={state.playback.mode === playmodes.REPEAT1 ? 'selected' : ''}
						  		handler={e => { 
						  			store.dispatch( setPlaymode(playmodes.REPEAT1) );
				  					e.preventDefault();
						  		}}
						  	/>
						  	<MenuItem
						  		title="Shuffle"
						  		status={state.playback.mode === playmodes.SHUFFLE ? 'selected' : ''}
						  		handler={e => { 
						  			store.dispatch( setPlaymode(playmodes.SHUFFLE) );
				  					e.preventDefault(); 
						  		}}
						  	/>
      				</ul>
      			</li>
				  	<li role="separator" className="divider"></li>
				  	<li><a className="dropdown-item" href="#">Cast</a></li>
				  	<li role="separator" className="divider"></li>
				  	<li><a className="dropdown-item" href="#">Compact</a></li>
				  	<li><a className="dropdown-item" href="#">Night mode</a></li>
				  	<li role="separator" className="divider"></li>
						<li><a className="dropdown-item" href="#">Console</a></li>
				  	<li role="separator" className="divider"></li>
				  	<li><a className="dropdown-item" href="#">Help</a></li>
					</ul>
				</div>
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

NavBar.contextTypes = {
	store: PropTypes.object
}


const MenuItem = props => {
	return(
		<li className={props.status}>
			<a 
				className={props.className} 
				href={props.href}
				onClick={props.handler}
			>
				{props.title}
			</a>
		</li>
	);
}

MenuItem.propTypes = {
	className: PropTypes.string,
	status: PropTypes.string,
	handler: PropTypes.func,
	href: PropTypes.string,
	title: PropTypes.string.isRequired
}

MenuItem.defaultProps = {
	className: 'dropdown-item ',
	status: '',
	href: '#'
}

export default NavBar;