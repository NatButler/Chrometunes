import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../Button';
import { saveList, clearTracks } from '../../actions/actions';

const Controls = ({ isDisabled, upnext }, { store }) => {
	let currentTrack = store.getState().playback.nowPlaying.track;
	return (
		<div id="up-next-controls" className="btn.group">
			<Button
				label="SAVE"
				// icon="floppy-disk"
				disabled={isDisabled}
				handler={() => {
					store.dispatch( saveList(upnext, currentTrack) );
					$('#tabs a[href="#playlists"]').tab('show');
				}}
			/>

			<Button
				label="CLEAR"
				// icon="trash"
				disabled={isDisabled}
				handler={() => {
					store.dispatch( clearTracks() );
				}}
			/>
		</div>
	);
}

Controls.contextTypes = {
	store: PropTypes.object
}

export default Controls;