import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../Button';
import { saveList, clearTracks } from '../../actions/actions';

const Controls = (props, { store }) => {
	const state = store.getState();

	return (
		<div id="up-next-controls">
			<Button
				label="SAVE"
				// icon="floppy-disk"
				disabled={state.upnext.length ? '' : 'disabled'}
				handler={ () => {
					store.dispatch( saveList(state.upnext, state.playback.track) );
				}}
			/>

			<Button
				label="CLEAR"
				disabled={state.upnext.length ? '' : 'disabled'}
				handler={ () => {
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