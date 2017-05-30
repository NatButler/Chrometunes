import React from 'react';
import Button from '../Button';
import { loadPlaylist, delPlaylist } from '../../actions/actions';

const Playlists = ({ playlists }) => {
	let lists;
	if (playlists.length) {
		lists = playlists.map( (list, i) => {
			return <Playlist key={i} index={i} list={list} name={Object.keys(list)} />;
		});
	} else {
		lists = <li className="warning">No playlists saved.</li>
	}

	return (
    <div id="playlists" className="tab-pane" role="tab-pane">
      <ul id="playlists-ul">
				{lists}
      </ul>
    </div>
	);
}

const Playlist = ({index, list, name}, { store }) => {
	return (
		<div className="playlist-item">
			<li
				onClick={ () => {
					store.dispatch( loadPlaylist(list[name]) );
					// Set upnext tab active
				}}
			>
				{name}
			</li>

			<Button
				icon="remove-circle"
				className="close"
				handler={ () => {
					store.dispatch( delPlaylist(index) );
				}}
			/>
		</div>
	);
}

Playlist.contextTypes = {
	store: React.PropTypes.object
}

export default Playlists;