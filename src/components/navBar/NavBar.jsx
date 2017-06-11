import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlaybackControls from './playback';
import Menu from './menu';
import { filterLib, searchLib, clearSearch, clearFiltered } from '../../actions/actions';
import { trkSearch } from '../../librarySearch';
import * as filterTypes from '../../constants/filterTypes';

class NavBar extends Component {
	constructor() {
		super();
		this.state = {
			filter: ''
		};
		this.timer;
	}

	shouldComponentUpdate(nextProps) {
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

				<PlaybackControls />

				<div id="select-wrap" className={(this.state.filter === '') ? '' : 'filter-selected'}>
					<select
						ref={node => { this.select = node; }}
						name="genres"
						className={'form-inline ' + ((this.state.filter === '') ? '' : 'filter-selected')}
						id="filterSelect"
						onChange={() => {
							this.state.filter = this.select.value;
							this.handleFilter(this.select.value);
						}}
						value={props.filterType !== filterTypes.GENRE ? props.filterType : this.state.filter}
					>
						{(props.filterType !== '' && props.filterType !== filterTypes.GENRE) ? <option value={props.filterType} disabled>{'[ ' + props.filterType + ' ]'}</option> : null}
						<option value="">{'[ FILTER ]'}</option>
						{genreList}
					</select>
				</div>

        <input
					ref={node => { this.searchInput = node; }}
					type="text"
					id="searchInput"
					name="q"
					// placeholder="Search"
					spellCheck="false"
					autoComplete="off"
					autoFocus="true"
					onKeyUp={() => {
						if (this.searchInput.value !== props.query) {
							this.handleSearch(this.searchInput.value);
						}
					}}
					onSubmit={() => { console.log(this.searchInput.value); }}
        />

				<Menu />
			</nav>
		);
	}

	handleSearch(query) {
		const props = this.props;
		clearTimeout( this.timer );
		if (!query) { props.onClearSearch(); }
		else {
			this.timer = (query.length >= 3) && setTimeout( () => {
				console.time('trkSearch');
				let results = props.filter ? trkSearch(props.filtered, query) : trkSearch(props.tracks, query);
				console.timeEnd('trkSearch');
				if (!results) { props.onClearSearch(); }
				else { props.onSearch(results, query); }
			}, 200);
		}
	}

	handleFilter(filter) {
		const props = this.props;
		if (!filter) {
			props.onClearFilter();
			if (props.query) { this.handleSearch(props.query); }
		} else {
			props.onFilter(props.tracks, filter);
			if (props.query) { this.handleSearch(props.query); }
		}
	}
}

const mapStateToProps = state => ({
	tracks: state.library.tracks,
	filterType: state.library.filterType,
	filter: state.library.filter,
	filtered: state.library.filtered,
	query: state.library.query,
	genres: state.library.genres
});

const Navigation = connect(
	mapStateToProps, {
		onSearch: searchLib,
		onClearSearch: clearSearch,
		onFilter: filterLib,
		onClearFilter: clearFiltered
	})(NavBar);

export default Navigation;