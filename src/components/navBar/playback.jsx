import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { playTrack, setPlayback, togglePlaymode, togglePlayback } from '../../actions/actions';
import * as pS from '../../constants/playStates';
import * as pM from '../../constants/playModes';
import AudioPlayer from '../Audio';
import Button from '../Button';
import { loadMedia, player, playerController } from '../../cast';

class Playback extends Component {
	constructor() {
		super();
		this.audio;
	}

	shouldComponentUpdate(nextProps) {
		const { lib, playback, upnext } = this.props;
		if (lib.length !== nextProps.lib.length) { return false; }
		if (playback.mode !== nextProps.playback.mode) { return true; } 
		if (upnext.length && !nextProps.upnext.length) { return true; }
		if (!upnext.length && nextProps.upnext.length) { return true; }
		if (playback.track && nextProps.playback.track) { return playback.track['PId'] !== nextProps.playback.track['PId']; }
		if (upnext.length !== nextProps.upnext.length && !playback.track && !nextProps.playback.track) { return false; }
		else { return !playback.track && nextProps.playback.track; }
	}

	render() {
		console.log('Playback.');
		const props = this.props;
		const { playback, upnext, lib, index, serverAdd } = this.props;
		let src;
		if (playback.track) {
			src = this.audioSrc(serverAdd, playback.track['Location']);
			this.cast(src, playback.track['Type']);
		}

 		return (
 			<div className="playback">
				<Button
					className={'btn btn-default skip '} 
					icon="step-forward"
					disabled={!upnext.length && playback.mode !== pM.REPEAT1 ? 'disabled' : ''}
					handler={() => {
						if (playback.mode !== pM.REPEAT1) { props.onNextTrack(lib, index, playback.mode, upnext, playback.track['PId']); } 
						else { this.audio.load(); }
					}}
				/>

				<AudioPlayer
					ref={ component => { this.audio = findDOMNode(component) }}
					className="audio"
					src={src}
					endedHandler={ () => { this.onEnded(playback, upnext); }}
					playHandler={ () => { props.onPlaybackChange(pS.PLAY); }}
					pauseHandler={ () => { props.onPlaybackChange(pS.PAUSE); }}
				/>

				<Button
	        className={'btn btn-default playmode ' + playback.mode}
					icon={(playback.mode === pM.NORMAL) ? pM.REPEAT : playback.mode}
					handler={() => { props.onTogglePlaymode() }}
				/>
			</div>
		);
	}

	audioSrc(server, dir) {
		return server + dir.slice(dir.indexOf('iTunes'));
	}

	onEnded(playback, upnext) {
		if (playback.mode !== pM.REPEAT1 && upnext.length > 0) {
			this.props.onNextTrack(this.props.lib, this.props.index, playback.mode, upnext, playback.track['PId']);
		}
		else if (playback.mode === pM.REPEAT1) { this.audio.load(); }
		else { this.props.onPlaybackChange(pS.IDLE); }
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
	serverAdd: state.app.serverAdd,
	lib: state.library.tracks,
	index: state.library.index
});

const PlaybackControls = connect(
	mapStateToProps, { 
		onNextTrack: playTrack, 
		onPlaybackChange: setPlayback, 
		onTogglePlaymode: togglePlaymode
	})(Playback);

export default PlaybackControls;