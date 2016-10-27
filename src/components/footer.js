import React from 'react';
import { skipTrack, playTrack } from '../actions/actions';
import { Audio } from './components';

const { Component } = React;


const Footer = ({store, state}) => {
	let src = (state.playback.track) ? AudioSrc(state.playback.track.Location) : '';
	return (
		<footer className="footer">
			<Audio
				className="audio"
				src={src}
				handler={ () => {
					store.dispatch( playTrack(state.playmode, state.upnext[0]) );
		          	store.dispatch( skipTrack(state.playmode) );
				}}
			/>
		</footer>
	);
}


/**
 * Pass in / start server as config
 * Trim location string on parsing iTunes file
 * Prepare type on parsing iTunes file
 */
const AudioSrc = (track) => {
	return 'http://localhost:8080/' + track.slice(track.indexOf('iTunes'));
		// type = 'audio/' + track.Kind;
	
	// return <source src={loc} type={type} />
}

export default Footer