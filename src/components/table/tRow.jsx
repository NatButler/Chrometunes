import React from 'react';
import { PropTypes } from 'prop-types';
import { addTrack, addDisc, addRemDisc, playTrack } from '../../actions/actions';

const TRow = ({ track, libTracks, trClass }, { store }) => {
	const playback = store.getState().playback.nowPlaying;

	return (
		<tr 
			data-id={track['PId']}
			className={trClass}
			onDoubleClick={() => {
				store.dispatch( addRemDisc(track, libTracks) );
				store.dispatch( playTrack(playback.mode, [track], playback.track) );
			}}
		>
			<td className="wide">{track['Artist']}</td>
			<td className="duration">{track['Duration']}</td>
			<td className="wide">
				<a href="#"
					onClick={e => {
						store.dispatch( addDisc(track, libTracks) );
						e.preventDefault;
					}}
				>
					{track['Album']}
				</a>
			</td>
			<td className="track">{track['Track']}</td>
			<td className="wide">
				<a href="#"
					onClick={e => {
						store.dispatch( addTrack(track) );
						e.preventDefault;
					}}
				>
					{track['Title']}
				</a>
			</td>
		</tr>
	);
}

TRow.contextTypes = {
	store: PropTypes.object
}

TRow.propTypes = {
	track: PropTypes.object,
	libTracks: PropTypes.array.isRequired,
	trClass: PropTypes.string
}

export default TRow;