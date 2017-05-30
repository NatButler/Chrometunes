import React from 'react';
import { skipTrack, playTrack, setPlayback, togglePlaymode } from '../actions/actions';
import * as playmodes from '../constants/playModes';
import AudioPlayer from './audio';
import Button from './Button';

/**
 * audioElem should be able to be referenced without getElementById?
 */
const Playback = (props, { store }) => {
	const state = store.getState();
	const playback = state.playback;
	const upnext = state.upnext;
	let audioElem = document.getElementById('player');
	let src = playback.track ? audioSrc(state.app.serverUrl, playback.track.Location) : '';
	if (player.isConnected) {
		console.log('Player connected.');
		if (!player.isMediaLoaded) {
			console.log('No media loaded.');
			loadMedia( request(src, playback.track.Kind) );				
		} else {
			if (player.mediaInfo.contentId !== src) {
				console.log('Cast: loading media.');
				loadMedia( request(src, playback.track.Kind) );				
			}
		} 
	}

	return (
		<div className="playback">
			<Button
				className={'btn btn-default skip '} 
				icon="step-forward"
				disabled={!upnext.length ? 'disabled' : ''}
				handler={ () => {
					if (playback.mode != 'refresh') {
						store.dispatch( playTrack(playback.mode, upnext, playback.track) );
						store.dispatch( skipTrack(playback.mode, playback.track) );
					} else {
						audioElem.load();
					}
				}}
			/>
			<AudioPlayer
				className="audio"
				src={src}
				endedHandler={ () => {
					if (playback.mode != playmodes.REPEAT1) {
						store.dispatch( playTrack(playback.mode, upnext) );
						store.dispatch( skipTrack(playback.mode, playback.track) );
					} 
					else if (upnext.length > 0) {
						audioElem.load();
					}
				}}
				playHandler={ () => {
					if (playback.state != 'play') {
						store.dispatch( setPlayback('play') );
					}
					if (player.isPaused) {
						playerController.playOrPause();
					}
				}}
				pauseHandler={ () => {
					if (playback.state != 'pause') {
						store.dispatch( setPlayback('pause') );
					}
					if (!player.isPaused) {
						playerController.playOrPause();
					}
				}}
				abortHandler={ () => {

				}}
				// errorHandler={ (e) => {
				// 	console.log(e);
				// 	if (e.target.error) {
				// 		console.log(e.target.error.code + ' Failed to load track.');
				// 	}
				// }}
			/>

			<Button
        className={'btn btn-default playmode ' + playback.mode}
				icon={(playback.mode === 'normal') ? 'repeat' : playback.mode}
				handler={ () => {
					store.dispatch( togglePlaymode() );
				}}
			/>
		</div>
	);
}

Playback.contextTypes = {
	store: React.PropTypes.object
}


/**
 * Start server during config
 * Trim location string on parsing iTunes file
 */
const audioSrc = (server, dir) => {
	return server + dir.slice(dir.indexOf('iTunes'));
}

export default Playback;