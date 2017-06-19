import React from 'react';
import PropTypes from 'prop-types';
import { saveState } from '../../../localStorage';
import { delPlaylist, namePlaylist } from '../../../actions/actions';

const NewPlaylist = ({ idx, id }, { store }) => {
	let input;
	const handleNewList = () => {
		if (!input.value) { store.dispatch( delPlaylist(idx) ); }
		else{ store.dispatch( namePlaylist(id, input.value) ); }
		saveState( store.getState() );
	}

	return (
		<li className="new-playlist">
			<input
				ref={node => { input = node; }}
				type="text"
				name="plist-input"
				className="plist-input"
				placeholder="Input playlist name"
				spellCheck="false"
				autoComplete="off"
				autoFocus="true"
				onBlur={() => { handleNewList(); }}
				onKeyPress={e => {
					if (!e) {e = window.event;}
					let keyCode = e.keyCode || e.which;
					if (keyCode == '13') {
						handleNewList();
			      return false;
			    }
				}}
			/>
		</li>
	);
}

NewPlaylist.propTypes = {
	idx: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired
}

NewPlaylist.contextTypes = {
	store: React.PropTypes.object
}

export default NewPlaylist;