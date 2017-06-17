import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterLib, clearFiltered } from '../../actions/actions';
import * as filterTypes from '../../constants/filterTypes';

class Select extends Component {
	constructor() {
		super();
		this.state = {
			filter: ''
		};
	}

	shouldComponentUpdate(nextProps) {
		return this.props.filterType === nextProps.filterType || this.props.filterType !== nextProps.filterType;
	}

	render() {
		console.log('Filter.');
		const props = this.props;
		const genreList = props.genres.map( (genre, i) => {
			return <option key={i} value={genre}>{genre}</option>;
		});

		return (
			<div id="select-wrap" className={(props.filterType !== filterTypes.GENRE) ? '' : 'filter-selected'}>
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
					<option value="">[ FILTER ]</option>
					{genreList}
				</select>
			</div>
		);
	}

	handleFilter(filter) {
		const props = this.props;
		if (!filter) {
			props.onClearFilter();
		} else {
			props.onFilter(props.lib, filter);
		}
	}
}

const mapStateToProps = state => ({
	genres: state.library.genres,
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