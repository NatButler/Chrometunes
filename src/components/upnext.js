import React from 'react';
import { Button } from './components';
import { delTrack, saveList, filterArtist, filterAlbum, togglePlayback, clearTracks } from '../actions/actions';


const UpNext = ({store}) => {
	const state = store.getState();

	let currentTrack = (state.playback.track) ? <NowPlaying store={store} playback={state.playback} /> : '',
		tracks = state.upnext.map( (trk, i) => {
			return (
				<li key={i}>
					<Button
						className="close"
						icon="remove-circle"
						handler={ () => {
							store.dispatch( delTrack(i) );
						}}
					/>
					<UpNextItem store={store} trk={trk} />
				</li>
			);
		});

	return (
	    <div id="up-next" className="tab-pane active" role="tab-pane">
        	<ul id="up-next-ul">
		    	{currentTrack}
        		{tracks}
        	</ul>
        	<UpNextControls store={store} state={state} />
        </div>
	);
}

const NowPlaying = ({store, playback}) => {
	const audio = document.getElementById('player');
	return (
		<li id="current-track">
			<Button 
				icon={(playback.state == 'play') ? 'pause' : 'play'}
				className="playback"
				handler={ () => {
					store.dispatch( togglePlayback() );
					(playback.state == 'play') ? audio.pause() : audio.play();
				}}
			/>
			<UpNextItem store={store} trk={playback.track} />
		</li>
	);
}

const UpNextItem = ({store, trk}) => {
	return (
		<div className="up-next-item">
			<h5>
				{trk.Name}
				<span className="duration">{' [ ' + trk.Duration + ' ]'}</span>
			</h5>
			<h6
				className="up-next-artist"
				onClick={ () => {
					store.dispatch( filterArtist(trk.Artist) );
				}}
			>
				{trk.Artist}  
			</h6>
			<span className="divider"> | </span>
			<h6
				className="up-next-album"
				onClick={ () => {
					store.dispatch( filterAlbum(trk.Album) );
				}}
			>
				{trk.Album}
			</h6>
		</div>
	);
}

const UpNextControls = ({store, state}) => {
	return (
		<footer id="up-next-controls">
		    <Button
		    	// icon="floppy-disk"
		    	label="[ SAVE ]"
				disabled={state.upnext.length ? '' : 'disabled'}
				handler={ () => {
					store.dispatch( saveList(state.upnext, state.playback.track) );
				}}
		    />

			<Button
				// icon="trash"
				label="[ CLEAR ]"
				disabled={state.upnext.length ? '' : 'disabled'}
		    	handler={ () => {
		    		store.dispatch( clearTracks() );
				}}
			/>
		</footer>
	);
}

export default UpNext