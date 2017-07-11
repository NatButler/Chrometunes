import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import { query, clearSearch } from '../../actions/actions';

class Input extends Component {
	constructor() {
		super();
		this.timer;
		this.input;
	}

	shouldComponentUpdate(nextProps) {
		return false;
	}

	render() {
		console.log('Search.');

		return(
			<div className="search-wrap">
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
						if (e.target.value.length > 2) {
							console.log(this.clearButton);	
							// this.clearButton.disabled = false;
						}
					}}
			  />
				<Button
					ref={node => { this.clearButton = node; }}
					icon="remove"
					disabled={true}
					className={(this.input) ? (this.input.value.length < 2) ? 'clear-search disabled' : 'clear-search' : 'clear-search'}
					handler={() => {
						this.props.onClearSearch();
					}}
				/>
			</div>
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