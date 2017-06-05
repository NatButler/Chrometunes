import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import THead from './tHead';
import TBody from './tBody';

class Table extends Component {
	// shouldComponentUpdate(nextProps) {
	// 	console.log(this.props, nextProps);
	// }

	render() {
		console.log('Rendering Table.');
		const props = this.props;
		let tracks = props.libTracks;
		if (props.libQuery) { tracks = props.libSearch; }
		else if (props.libFiltered.length > 0) { tracks = props.libFiltered; }

		return (
			<table className="col-md-9 table-striped table-condensed">
				<THead colHeads={props.tHds} />
				<TBody tracks={tracks} />
				<tfoot>
					<tr><td colSpan="5">{tracks.length} tracks</td></tr>
				</tfoot>
			</table>
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

const mapStateToProps = state => ({
	libQuery: state.library.query,
	libSearch: state.library.search,
	libFiltered: state.library.filtered,
	libTracks: state.library.tracks,
	tHds: state.app.tableHds,
	currentTrk: state.playback.track
});

export default connect(mapStateToProps)(Table);