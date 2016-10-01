import React from 'react';
import { getAlbum } from '../library';

const { Component } = React;


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
				<TableBody store={store} tracks={state.library.search} />
				<TableFooter state={state.library.search.length} />
			</table>
		</div>
	);
}

const TableBody = ({store, tracks}) => {
	let rows = tracks.map((trk, i) => {
		return <TableRow key={i} track={trk} store={store} tracks={tracks} />
	});
	return <tbody>{rows}</tbody>;
}

const TableRow = ({track, store, tracks}) => {
	return (
		<tr 
			data-id={track.PId} 
			onDoubleClick={() => {
				let album = getAlbum(track.Album);
				store.dispatch({
					type: 'ADD_REM_ALBUM',
					album: album,
					index: track.TrackNum -1
				});
			}}>
			<td>{track.Artist}</td>
			<td>{track.Duration}</td>
			<td className="album">
				<a href="#" className="album" onClick={(e) => {
	                e.preventDefault;
					let album = getAlbum(track.Album);
					store.dispatch({
						type: 'ADD_ALBUM',
						album: album
					})
				}}>{track.Album}</a>
			</td>
			<td>{track.TrackNum}</td>
			<td className="title">
				<a href="#" className="track" onClick={(e) => {
	           		e.preventDefault;
					store.dispatch({
						type: 'ADD_TRACK',
						track: track
					});
				}}>{track.Name}</a>
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