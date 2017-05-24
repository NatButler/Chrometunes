import React from 'react';
import { PropTypes } from 'prop-types';
import { addTrack, addAlbum, addRemAlbum, playTrack } from '../../actions/actions';

const TBody = ({ tracks, colWidth }) => {	
	let rows = tracks.map( (trk, i) => {
		return <TRow key={i} track={trk} colWidth={colWidth} />
	});
	return <tbody>{rows}</tbody>;
}

const TRow = ({ track, colWidth }, { store }) => {
	const state = store.getState();
	const tracks = state.library.tracks;
	let trClass = (state.playback.track.PId === track.PId) ? 'currentTrack' : '';

	return (
		<tr 
			data-id={track.PId}
			className={trClass}
			onDoubleClick={ () => {
				store.dispatch( addRemAlbum(track, tracks) );
				store.dispatch( playTrack('normal', [track]) );
			}}
		>
			<td 
				className="wide" 
				width={colWidth}
			>
				{track.Artist}
			</td>
			<td className="duration">{track.Duration}</td>
			<td 
				className="wide"
				width={colWidth}
			>
				<a href="#"
					onClick={ e => {
						e.preventDefault;
						store.dispatch( addAlbum(track.Album, tracks) );
					}}
				>
					{track.Album}
				</a>
			</td>
			<td className="track">{track.Track}</td>
			<td 
				className="wide" 
				width={colWidth}
			>
				<a href="#"
					onClick={ e => {
						e.preventDefault;
						store.dispatch( addTrack(track) );
					}}
				>
					{track.Title}
				</a>
			</td>
		</tr>
	);
}

TRow.contextTypes = {
	store: PropTypes.object
}

export default TBody;