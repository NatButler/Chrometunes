import React, { Component } from 'react';
import { skipTrack, playTrack, setPlayback, setPlaymode } from '../actions/actions';
import { Audio, Button } from './components';


/**
 * audioElem should be able to be referenced without getElementById?
 */
const Playback = ({store}) => {
	const state = store.getState();
	let src = (state.playback.track) ? audioSrc(state.playback.track.Location) : '',
		audioElem = document.getElementById('player');

	return (
		<div className="playback">
			<Audio
				className="audio"
				src={src}
				endedHandler={ () => {
					if (state.playmode != 'refresh') {
						store.dispatch( playTrack(state.playmode, state.upnext) );
		          		store.dispatch( skipTrack(state.playmode, state.playback.track) );	
					} else {
						audioElem.load();
					}
					
				}}
				playHandler={ () => {
					store.dispatch( setPlayback('play') );
				}}
				pauseHandler={ () => {
					store.dispatch( setPlayback('pause') );
				}}
			/>
			
			<Button
		        className={'btn btn-default skip '} 
				icon="step-forward"
				disabled={!state.upnext.length ? 'disabled' : ''}
				handler={ () => {
					if (state.playmode != 'refresh') {
	              		store.dispatch( playTrack(state.playmode, state.upnext, state.playback.track) );
	              		store.dispatch( skipTrack(state.playmode, state.playback.track) );
	              	} else {
						audioElem.load();
					}
            	}}
			/>
			
			<Button
		        className={'btn btn-default playmode ' + state.playmode}
	        	icon={(state.playmode == 'normal') ? 'repeat' : state.playmode}
	        	handler={ () => {
	            	store.dispatch( setPlaymode() );
	        	}}
			/>
		</div>
	);
}


/**
 * Pass in / start server as config
 * Trim location string on parsing iTunes file
 * Prepare type on parsing iTunes file
 */
const audioSrc = (track) => {
	return 'http://localhost:8080/' + track.slice(track.indexOf('iTunes'));
}

export default Playback