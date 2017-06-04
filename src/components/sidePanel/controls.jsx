import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../Button';
import { saveList, clearTracks } from '../../actions/actions';

const Controls = ({ isDisabled }, { store }) => (
	<div id="up-next-controls" className="btn.group">
		<Button
			label="SAVE"
			// icon="floppy-disk"
			disabled={isDisabled ? 'disabled' : ''}
			handler={ () => {
				// Focus input and visual queue or display instruction
				$('#searchInput').focus();
				// $('#tabs a[href="#playlists"]').tab('show');
			}}
		/>

		<Button
			label="CLEAR"
			// icon="trash"
			disabled={isDisabled ? 'disabled' : ''}
			handler={ () => {
				store.dispatch( clearTracks() );
			}}
		/>
	</div>
);

Controls.contextTypes = {
	store: PropTypes.object
}

export default Controls;