import React from 'react';
import { addTrack, addAlbum, addRemAlbum, playTrack, skipTrack } from '../actions/actions';

const { Component } = React;


class VisibleTable extends Component {
	render() {
		
	}
}


const Table = ({store, state}) => {
	return (
		<div className="col-md-9">
			<table className="table-striped table-condensed">
				<thead>
					<tr>
						<th>Artist</th>
						<th>Duration</th>
						<th>Album</th>
						<th>Track</th>
						<th>Title</th>
					</tr>
				</thead>
				<TableBody store={store} state={state} tracks={state.library.search} />
				<TableFooter state={state.library.search.length} />
			</table>
		</div>
	);
}

const TableBody = ({store, state, tracks}) => {
	let rows = tracks.map( (trk, i) => {
		return <TableRow key={i} track={trk} store={store} tracks={tracks} state={state} />
	});
	return <tbody>{rows}</tbody>;
}

const TableRow = ({track, store, tracks, state}) => {
	return (
		<tr 
			data-id={track.PId} 
			onDoubleClick={ () => {
				store.dispatch( addRemAlbum(track) );
				store.dispatch( playTrack(state.playmode, track) );
			}}>
			<td>{track.Artist}</td>
			<td>{track.Duration}</td>
			<td className="album">
				<a href="#" className="album" onClick={(e) => {
	                e.preventDefault;
					store.dispatch( addAlbum(track.Album) )
				}}>
					{track.Album}
				</a>
			</td>
			<td>{track.TrackNum}</td>
			<td className="title">
				<a href="#" className="track" onClick={(e) => {
	           		e.preventDefault;
					store.dispatch( addTrack(track) );
				}}>
					{track.Name}
				</a>
			</td>
		</tr>
	);
}

const TableFooter = ({state}) => {
	return (
		<tfoot>
			<tr>
				<td colSpan="5">{state} tracks</td>
			</tr>
		</tfoot>
	);
}

export default Table