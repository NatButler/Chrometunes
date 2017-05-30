import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import { connect } from 'react-redux';
import THead from './tHead';
import TBody from './tBody';
import { setTableWidth, setColWidth } from '../../actions/actions';

class Table extends Component {
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
		let tracks;
		if (state.library.query) { tracks = state.library.search; }
		else if (state.library.filtered.length > 0) { tracks = state.library.filtered; }
		else { tracks = state.library.tracks; }

		return (
			<div className="col-md-9 table-container">
				<table className="table-striped table-condensed">
					<THead colHeads={state.app.tableHds} />
					<TBody tracks={tracks} />

					<tfoot>
						<tr><td colSpan="5">{tracks.length} tracks</td></tr>
					</tfoot>
				</table>
			</div>
		);
	}

	// calcColWidths() {
	// 	let colWidth, narrowCols = 0;

	// 	for (let i = 0; i < this.ths.length; i++) {
	// 		if (i%2 == 1) {
	// 			narrowCols += this.ths[i].offsetWidth;
	// 		}
	// 	}

	// 	colWidth = Math.floor( (this.width - narrowCols) / 3 );

	// 	for (let i = 0; i < this.ths.length; i++) {
	// 		if (i%2 != 1) { 
	// 			this.ths[i].width = colWidth;
	// 			this.colWidths.push(colWidth);
	// 		} else {
	// 			this.colWidths.push(this.ths[i].offsetWidth);
	// 		}
	// 	}
	// }
}

Table.contextTypes = {
	store: PropTypes.object
}

// const mapStateToProps = (state) => {
// 	return {

// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {

// 	}
// }

export default Table;