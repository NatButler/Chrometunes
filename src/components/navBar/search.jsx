import React, { Component } from 'react';
import { connect } from 'react-redux';
import { query, clearSearch } from '../../actions/actions';

class Input extends Component {
	constructor() {
		super();
		this.timer;
	}

	shouldComponentUpdate(nextProps) {
		return false;
	}

	render() {
		console.log('Search.');
		return(
		  <input
				type="text"
				id="searchInput"
				name="q"
				spellCheck="false"
				autoComplete="off"
				autoFocus="true"
				onKeyUp={e => {
					if (e.target.value !== this.props.query) {
						this.handleSearch(e.target.value);
					}
				}}
		  />
		);
	}

	handleSearch(query) {
		const props = this.props;
		clearTimeout( this.timer );
		if (query.length < 2 && props.query.length) { props.onClearSearch(); }
		else {
			this.timer = (query.length >= 2) && setTimeout( () => {
				props.onSearch(query);
			}, 300);
		}
	}
}

const mapStateToProps = state => ({
	query: state.library.query
});

const Search = connect(
	mapStateToProps, {
		onSearch: query,
		onClearSearch: clearSearch
	}
)(Input);

export default Search;