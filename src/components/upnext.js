import React from 'react';
import { Button } from './components';
import { delTrack, saveList, filterArtist, filterAlbum } from '../actions/actions';


const UpNext = ({store, state}) => {
	let currentTrack = (state.playback.track) ? <NowPlaying playback={state.playback} store={store} /> : '';
	let tracks = state.upnext.map( (trk, i) => {
		return (
			<li key={i}>
				<Button
					className="close"
					icon="remove-circle"
					handler={ () => {
						store.dispatch( delTrack(i) );
					}}
				/>
				<UpNextItem index={i} trk={trk} store={store} />
			</li>
		);
	});

	return (
	    <div id="up-next" className="tab-pane active" role="tab-pane">
	    	{currentTrack}
        	<ul id="up-next-ul">
        		{tracks}
        	</ul>
        	<UpNextControls store={store} />
        </div>
	);
}

const NowPlaying = ({playback, store}) => {
	const audio = document.getElementById('player');
	return (
		<div id="current-track">
			<Button 
				icon={(playback.state == 'play') ? 'pause' : 'play'}
				className="playback"
				handler={ () => {
					store.dispatch({ type: 'TOGGLE_PLAYBACK' } );
					(playback.state == 'play') ? audio.pause() : audio.play();
				}}
			/>
			<UpNextItem trk={playback.track} store={store} />
		</div>
	);
}

const UpNextItem = ({index, trk, store}) => {
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

const UpNextControls = ({store}) => {
	let upnext = store.getState().upnext;
	return (
		<footer id="up-next-controls">
		    <Button
		    	icon="floppy-disk"
				disabled={upnext.length ? '' : 'disabled'}
				handler={ () => {
					store.dispatch( saveList(upnext) );
				}}
		    />

			<Button
				icon="trash"
				disabled={upnext.length ? '' : 'disabled'}
		    	handler={ () => {
		    		store.dispatch({ type: 'CLEAR_TRACKS' });
				}}
			/>
		</footer>
	);
}

export default UpNext