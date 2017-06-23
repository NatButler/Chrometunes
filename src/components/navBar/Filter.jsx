import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterLib, clearFiltered } from '../../actions/actions';
import * as fT from '../../constants/filterTypes';

class Select extends Component {
	constructor() {
		super();
		this.state = {
			filter: ''
		};
	}

	shouldComponentUpdate(nextProps) {
		return this.props.genres.length !== nextProps.genres.length || this.props.filter !== nextProps.filter;
	}

	render() {
		console.log('Filter.');
		const { filterType, filter, genres } = this.props;
		const genreList = genres.map( (genre, i) => {
			return <option key={i} value={genre}>{genre}</option>;
		});

		return (
			<div id="select-wrap" className={(filterType !== fT.GENRE) ? '' : 'filter-selected'}>
				<select
					ref={node => { this.select = node; }}
					name="genres"
					className={'form-inline ' + ((this.state.filter === '') ? '' : 'filter-selected')}
					id="filterSelect"
					onChange={() => {
						this.state.filter = this.select.value;
						this.handleFilter(this.select.value);
					}}
					value={filterType !== fT.GENRE ? filterType : filter}
				>
					{(filterType !== '' && filterType !== fT.GENRE) ? <option value={filterType} disabled>{'[ ' + filterType + ' ]'}</option> : null}
					<option value="">[ FILTER ]</option>
					{genreList}
				</select>
			</div>
		);
	}

	handleFilter(filter) {
		const props = this.props;
		if (!filter) { props.onClearFilter(); }
		else { props.onFilter(props.lib, filter); }
	}
}

const mapStateToProps = state => ({
	genres: state.library.genres,
	filter: state.library.filter,
	filterType: state.library.filterType,
	lib: state.library.tracks
});

const Filter = connect(
	mapStateToProps, {
		onFilter: filterLib,
		onClearFilter: clearFiltered
	}
)(Select);

export default Filter;