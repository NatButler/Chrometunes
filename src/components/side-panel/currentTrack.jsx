import React from 'react';
import { PropTypes } from 'prop-types';
import { Item } from './upNextItems';
import Button from '../Button';

const NowPlaying = (props, { store }) => {
	const audio = document.getElementById('player');
	const playback = store.getState().playback;

	return (
		<div id="current-track">
			<Button 
				icon={(playback.state === 'play') ? 'pause' : 'play'}
				className="playback"
				// disabled={(audio.readyState) ? false : true}
				handler={ () => {
					(playback.state === 'play') ? audio.pause() : audio.play();
				}}
			/>
			<Item trk={playback.track} />
		</div>
	);
}

NowPlaying.contextTypes = {
	store: PropTypes.object
}

export default NowPlaying;