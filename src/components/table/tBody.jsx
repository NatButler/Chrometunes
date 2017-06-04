import React from 'react';
import { PropTypes } from 'prop-types';
import { addTrack, addAlbum, addRemAlbum, playTrack } from '../../actions/actions';

const TBody = ({ tracks }) => {
	let rows = tracks.map( trk => {
		return <TRow key={trk.PId} track={trk} />
	});
	return <tbody>{rows}</tbody>;
}

const TRow = ({ track }, { store }) => {
	const state = store.getState();
	const tracks = state.library.tracks;
	const playback = state.playback;
	let trClass = (playback.track && playback.track.PId === track.PId) ? 'currentTrack' : '';

	return (
		<tr 
			data-id={track.PId}
			className={trClass}
			onDoubleClick={() => {
				store.dispatch( addRemAlbum(track, tracks) );
				store.dispatch( playTrack(playback.mode, [track], playback.track) );
			}}
		>
			<td className="wide">{track.Artist}</td>
			<td className="duration">{track.Duration}</td>
			<td className="wide">
				<a href="#"
					onClick={e => {
						store.dispatch( addAlbum(track, tracks) );
						e.preventDefault;
					}}
				>
					{track.Album}
				</a>
			</td>
			<td className="track">{track.Track}</td>
			<td className="wide">
				<a href="#"
					onClick={e => {
						store.dispatch( addTrack(track) );
						e.preventDefault;
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