import React from 'react';
import { PropTypes } from 'prop-types';
import { NowPlaying, UpNextItem } from './upNextItems';
// import Controls from './controls';
import { Button } from '../components';

const UpNext = (props, { store }) => {
	const state = store.getState();
	let currentTrack = (state.playback.track) ? <NowPlaying /> : '';
	let tracks = state.upnext.map( (trk, i) => {
		return <UpNextItem key={i} trk={trk} idx={i} />;
	});

	// <Controls />

	return (
		<div id="up-next" className="tab-pane active" role="tab-pane">
			<ul id="up-next-ul">
				{currentTrack}
				{tracks}
			</ul>
		</div>
	);
}

UpNext.contextTypes = {
	store: PropTypes.object
}

export default UpNext;