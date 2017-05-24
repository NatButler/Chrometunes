import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '../components';
import { saveList, clearTracks } from '../../actions/actions';

const Controls = (props, { store }) => {
	const state = store.getState();

	return (
		<footer id="up-next-controls">
			<Button
				label="SAVE"
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
		</footer>
	);
}

Controls.contextTypes = {
	store: PropTypes.object
}

export default Controls;