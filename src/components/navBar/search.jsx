import React, { Component } from 'react';
import { connect } from 'react-redux';
import { query, clearSearch } from '../../actions/actions';

class Input extends Component {
	constructor() {
		super();
		this.input;
	}

	shouldComponentUpdate(nextProps) {
		return false;
	}

	render() {
		console.log('Search.');
		return(
		  <input
				ref={node => { this.input = node; }}
				type="text"
				id="searchInput"
				name="q"
				// placeholder="Search"
				spellCheck="false"
				autoComplete="off"
				autoFocus="true"
				onKeyUp={() => {
					if (this.input.value !== this.props.query) {
						this.handleSearch(this.input.value);
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