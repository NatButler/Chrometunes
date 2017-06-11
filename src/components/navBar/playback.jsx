import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { playTrack, setPlayback, togglePlaymode, togglePlayback } from '../../actions/actions';
import * as playstate from '../../constants/playStates';
import * as playmode from '../../constants/playModes';
import AudioPlayer from '../Audio';
import Button from '../Button';
import { loadMedia, player, playerController } from '../../cast';

class Playback extends Component {
	constructor() {
		super();
		this.audio;
	}

	shouldComponentUpdate(nextProps) {
		const props = this.props;
		if (props.playback.mode !== nextProps.playback.mode) { return true; } 
		else if (props.upnext.length && !nextProps.upnext.length) { return true; }
		else if (!props.upnext.length && nextProps.upnext.length) { return true; }
		else { 
			if (props.playback.track && nextProps.playback.track) { return props.playback.track['PId'] !== nextProps.playback.track['PId']; }
			else { return !props.playback.track && nextProps.playback.track; }
		}
	}

	render() {
		console.log('Rendering Playback.');
		const props = this.props;
		const playback = this.props.playback;
		const upnext = this.props.upnext;
		let src;
		if (playback.track) {
			src = this.audioSrc(this.props.serverAdd, playback.track['Location']);
			this.cast(src, playback.track['Type']);
		}

 		return (
 			<div className="playback">
				<Button
					className={'btn btn-default skip '} 
					icon="step-forward"
					disabled={!upnext.length && playback.mode !== playmode.REPEAT1 ? 'disabled' : ''}
					handler={() => {
						if (playback.mode !== playmode.REPEAT1) { props.onNextTrack(playback.mode, upnext, playback.track); } 
						else { this.audio.load(); }
					}}
				/>

				<AudioPlayer
					ref={ component => { this.audio = findDOMNode(component) }}
					className="audio"
					src={src}
					endedHandler={ () => { this.onEnded(playback, upnext); }}
					playHandler={ () => { props.onPlaybackChange(playstate.PLAY); }}
					pauseHandler={ () => { props.onPlaybackChange(playstate.PAUSE); }}
				/>

				<Button
	        className={'btn btn-default playmode ' + playback.mode}
					icon={(playback.mode === playmode.NORMAL) ? playmode.REPEAT : playback.mode}
					handler={() => { props.onTogglePlaymode() }}
				/>
			</div>
		);
	}

	audioSrc(server, dir) {
		return server + dir.slice(dir.indexOf('iTunes'));
	}

	onEnded(playback, upnext) {
		if (playback.mode !== playmode.REPEAT1 && upnext.length > 0) {
			console.log('Playing track...');
			this.props.onNextTrack(playback.mode, upnext, playback.track);
		}
		else if (playback.mode === playmode.REPEAT1) { this.audio.load(); }
		else { this.props.onPlaybackChange(playstate.IDLE); }
	}

	cast(src, type) {
		if (player.isConnected) {
			console.log('Player connected.');
			if (!player.isMediaLoaded) {
				console.log('No media loaded.');
				loadMedia(src, type);				
			} else {
				if (player.mediaInfo.contentId !== src) {
					console.log('Cast: loading media.');
					loadMedia(src, type);				
				}
			} 
		}
	}
}

const mapStateToProps = state => ({
	playback: state.playback.nowPlaying,
	upnext: state.playback.upnext,
	serverAdd: state.app.serverAdd
});

const PlaybackControls = connect(
	mapStateToProps, { 
		onNextTrack: playTrack, 
		onPlaybackChange: setPlayback, 
		onTogglePlaymode: togglePlaymode
	})(Playback);

export default PlaybackControls;