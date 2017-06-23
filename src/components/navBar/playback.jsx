import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { playTrack, setPlayback, togglePlaymode } from '../../actions/actions';
import * as pS from '../../constants/playStates';
import * as pM from '../../constants/playModes';
import ProgressBar from './progressBar';
import Audio from '../Audio';
import Button from '../Button';
import { loadMedia, player, playerController } from '../../cast';

class Playback extends Component {
	constructor() {
		super();
		this.audio;
		this.progressBar;
		this.bufferBar;
		this.state = {
			status: pS.PAUSE,
			canPlay: false,
			mute: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.playback.track !== undefined || this.props.playback.track !== nextProps.playback.track || this.state.mute !== nextState.mute;
	}

	render() {
		console.log('Playback.');
		const props = this.props;
		const { playback, upnext, lib, index, server } = this.props;
		const loop = playback.mode === pM.REPEAT1 || playback.mode === pM.REPEAT && !upnext.length || playback.mode === pM.SHUFFLE && !upnext.length;
		let src;
		let time = 0;
		if (playback.track) {
			src = this.audioSrc(server, playback.track['Location']);
			this.cast(src, playback.track['Type']);
		}

 		return (
 			<div className="playback">
 				<Audio
					ref={ component => { this.audio = findDOMNode(component) }}
					className="audio"
					src={src}
					loop={loop}
					canPlayHandler={ () => { this.state.canPlay = true; }}
					endedHandler={ () => { this.onEnded(playback, upnext); }}
					playHandler={ () => { this.state.status = pS.PLAY; props.onPlaybackChange(pS.PLAY); }}
					pauseHandler={ () => { this.state.status = pS.PAUSE; props.onPlaybackChange(pS.PAUSE); }}
					progressHandler={ () => {
						let prog = this.calcPos(this.audio.currentTime, this.audio.duration, 1000);
						this.progressBar.style.width = prog + '%';
						
						if (this.audio.buffered.length) {
							let buffered = this.calcPos(this.audio.buffered.end(this.audio.buffered.length -1), this.audio.duration, 10);
							this.bufferBar.style.width = buffered + '%';	
						}
					}}
				/>

 				<div className="playback-controls">
					<Button
						className="skip" 
						icon="step-forward"
						disabled={!upnext.length}
						handler={() => {
							if (playback.mode !== pM.REPEAT1) { props.onNextTrack(lib, index, playback.mode, upnext, playback.track['PId']); }
							else { this.audio.load(); }
						}}
					/>
					<Button
						className="play"
						icon={playback.status === pS.PLAY ? pS.PAUSE : pS.PLAY}
						disabled={!this.state.canPlay}
						handler={() => {
							playback.status !== pS.PLAY ? this.audio.play() : this.audio.pause();
						}}
					/>
					<Button
						className="mute"
						icon={this.state.mute ? 'volume-off' : 'volume-up'}
						handler={() => {
							this.handleMute();
						}}
					/>
					<input
						type="range"
						name="volume"
						min="0"
						max="1"
						step="0.1"
						onChange={e => {
							this.audio.volume = e.target.value;
						}}
					/>
				</div>

				<ProgressBar 
					ref={component => {
						if (component) {
							this.progressBar = component.refs.progress; 
							this.bufferBar = component.refs.buffer;
						}
					}} 
					audio={this.audio}
				/>

				<Button
	        className={'playmode ' + playback.mode}
					icon={(playback.mode === pM.NORMAL) ? pM.REPEAT : playback.mode}
					handler={() => { props.onTogglePlaymode() }}
				/>
			</div>
		);
	}

	calcPos(pos, dur, dec) {
		return Math.round( ((+pos/+dur)*100) * dec ) / dec;
	}

	audioSrc(server, dir) {
		return server + dir.slice(dir.indexOf('iTunes'));
	}

	onEnded(playback, upnext) {
		if (upnext.length > 0) {
			this.props.onNextTrack(this.props.lib, this.props.index, playback.mode, upnext, playback.track['PId']);
		}
		else { this.props.onPlaybackChange(pS.IDLE); }
	}

	handleMute() {
		if (this.audio.muted) {
			this.audio.muted = false; 
			this.setState({mute: false});
		} else {
			this.audio.muted = true; 
			this.setState({mute: true});
		}
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
	server: state.app.serverAdd,
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