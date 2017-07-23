import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../../Button';
import { saveState } from '../../../localStorage';
import { loadPlaylist, delPlaylist } from '../../../actions/actions';

const Playlist = ({id, list, title}, { store }) => {
	return (
		<li className="playlist-item">
			<a 
				className="playlist-name"
				onClick={e => {
					store.dispatch( loadPlaylist(list) );
					$('#tabs a[href="#up-next"]').tab('show');
					e.preventDefault();
				}}
			>
				{title}
				<span className="list-count badge">{list.length}</span>
			</a>
			<Button
				icon="remove-circle"
				className="close"
				handler={() => {
					store.dispatch( delPlaylist(id) );
					saveState( store.getState() );
				}}
			/>
		</li>
	);
}

Playlist.propTypes = {
	id: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
}

Playlist.contextTypes = {
	store: React.PropTypes.object
}

export default Playlist;