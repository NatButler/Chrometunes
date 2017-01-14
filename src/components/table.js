import React, { Component } from 'react';
import { addTrack, addAlbum, addRemAlbum, playTrack, skipTrack } from '../actions/actions';


class Table extends Component {
	constructor({store}) {
		super();
		this.store = store;
		this.width;
		this.ths;
		this.colWidths = [];
	}

	render() {
		const state = this.store.getState();
		let tracks = state.library.search;

		return (
			<div className="col-md-9">
				<table 
					className="table-striped table-condensed"
					ref={ node => {
						if (!this.width) this.width = node.offsetWidth;
					}}
				>
					<thead>
						<tr ref={ node => {
							if (!this.ths) this.ths = node.children; 
						}}>
							<th width={this.colWidths[0]}>Artist</th>
							<th width={this.colWidths[1]}>Duration</th>
							<th width={this.colWidths[2]}>Album</th>
							<th width={this.colWidths[3]}>Track</th>
							<th width={this.colWidths[4]}>Title</th>
						</tr>
					</thead>
					<TableBody store={this.store} tracks={tracks} colWidths={this.colWidths} />
					<TableFooter searchLen={state.library.search.length} />
				</table>
			</div>
		);
	}

	componentDidMount() {
		if (!this.colWidths.length) { this.calcColWidths(); }
	}

	calcColWidths() {
		let colWidth, narrowCols = 0;
		for (let i = 0; i < this.ths.length; i++) {
			if (i%2 == 1) {
				narrowCols += this.ths[i].offsetWidth;
			}
		}

		colWidth = Math.floor( (this.width - narrowCols) / 3 );

		for (let i = 0; i < this.ths.length; i++) {
			if (i%2 != 1) { 
				this.ths[i].width = colWidth;
				this.colWidths.push(colWidth);
			} else {
				this.colWidths.push(this.ths[i].offsetWidth);
			}
		}
	}
}

const TableBody = ({store, tracks, colWidths}) => {	
	let rows = tracks.map( (trk, i) => {
		return <TableRow key={i} store={store} track={trk} colWidths={colWidths} />
	});
	return <tbody>{rows}</tbody>;
}

const TableRow = ({store, track, colWidths}) => {
	return (
		<tr 
			data-id={track.PId} 
			onDoubleClick={ () => {
				store.dispatch( addRemAlbum(track) );
				store.dispatch( playTrack('normal', [track]) );
			}}>
			<td width={colWidths[0]}>{track.Artist}</td>
			<td width={colWidths[1]}>{track.Duration}</td>
			<td width={colWidths[2]}>
				<a 	href="#" 
					onClick={(e) => {
	                	e.preventDefault;
						store.dispatch( addAlbum(track.Album) )
					}}
				>
					{track.Album}
				</a>
			</td>
			<td width={colWidths[3]}>{track.TrackNum}</td>
			<td width={colWidths[4]}>
				<a 	href="#"
					onClick={(e) => {
		           		e.preventDefault;
						store.dispatch( addTrack(track) );
					}}
				>
					{track.Name}
				</a>
			</td>
		</tr>
	);
}

const TableFooter = ({searchLen}) => {
	return (
		<tfoot>
			<tr>
				<td colSpan="5">{searchLen} tracks</td>
			</tr>
		</tfoot>
	);
}

export default Table