import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '../../Button';
import { loadPlaylist, delPlaylist } from '../../../actions/actions';

const Playlist = ({idx, id, list, title}, { store }) => {
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
			</a>
			<Button
				icon="remove-circle"
				className="close"
				handler={() => {
					store.dispatch( delPlaylist(idx) );
				}}
			/>
		</li>
	);
}

Playlist.propTypes = {
	idx: PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
}

Playlist.contextTypes = {
	store: React.PropTypes.object
}

export default Playlist;