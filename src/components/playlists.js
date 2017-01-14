import React from 'react';
import { Button } from './components';
import { loadPlaylist, delPlaylist } from '../actions/actions';


const Playlists = ({store, playlists}) => {
	let lists = playlists.map( (list, i) => {
		return <Playlist key={i} index={i} list={list} name={Object.keys(list)} store={store} />
	});
	return (
        <div id="playlists" className="tab-pane" role="tab-pane">
            <ul id="playlists-ul">
                {lists}
            </ul>
        </div>
	);
}

const Playlist = ({index, list, name, store}) => {
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

export default Playlists