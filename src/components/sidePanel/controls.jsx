import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../Button';
import { saveList, clearTracks } from '../../actions/actions';

const Controls = ({ isDisabled }, { store }) => {
	return (
		<div id="up-next-controls" className="btn.group">
			<Button
				label="SAVE"
				// icon="floppy-disk"
				disabled={isDisabled}
				handler={() => {
					const state = store.getState().playback;
					store.dispatch( saveList(state.upnext, state.nowPlaying.track) );
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