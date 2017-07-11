import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
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
		this.timeDisplay;
		this.state = {
			status: pS.PAUSE,
			canPlay: false,
			mute: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.playback.track !== undefined || this.props.playback.track !== nextProps.playback.track || this.state.mute !== nextState.mute || this.props.playback.mode !== nextProps.playback.mode;
	}

	render() {
		console.log('Playback.');
		const props = this.props;
		const { store } = this.context;
		const { playback, lib, index, upnext, server } = this.props;
		const loop = playback.mode === pM.REPEAT1 || playback.mode === pM.REPEAT && !upnext.length || playback.mode === pM.SHUFFLE && !upnext.length;
		let src;
		let dur;
		if (playback.track) {
			src = this.audioSrc(server, playback.track['Location']);
			dur = playback.track['Duration'];
			this.cast(src, playback.track['Type']);
		}	

 		return (
 			<div className="playback">
 				<Audio
					ref={ component => { this.audio = findDOMNode(component) }}
					className="audio"
					src={src}
					loop={loop}
					canPlayHandler={() => { this.state.canPlay = true; }}
					endedHandler={() => { this.onEnded(); }}
					playHandler={() => { this.state.status = pS.PLAY; props.onPlaybackChange(pS.PLAY); }}
					pauseHandler={() => { this.state.status = pS.PAUSE; props.onPlaybackChange(pS.PAUSE); }}
					progressHandler={() => {
						let prog = this.calcPos(this.audio.currentTime, this.audio.duration, 1000);
						this.progressBar.style.width = prog + '%';
						
						if (this.audio.buffered.length) {
							let buffered = this.calcPos(this.audio.buffered.end(this.audio.buffered.length -1), this.audio.duration, 10);
							this.bufferBar.style.width = buffered + '%';	
						}

						let cT = parseInt(this.audio.currentTime, 10);
						let pT;
						if (cT !== pT) { this.timeDisplay.innerText = this.calcTime(cT); }
						pT = cT;
					}}
				/>

 				<div className="playback-controls">
					<Button
						className="skip" 
						icon="step-forward"
						disabled={!upnext.length}
						handler={() => {
							const props = this.props;
							this.progressBar.style.width = '0%';
							this.bufferBar.style.width = '0%';	

							if (props.playback.mode !== pM.REPEAT1) { 
								props.onNextTrack(lib, index, props.playback.mode, props.upnext, props.playback.track['PId']);
							}
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
						step="0.01"
						autoComplete="false"
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
							this.position = component.refs.position;
						}
					}} 
					audio={this.audio}
					onMouseMove={e => {
						this.position.style.width = (e.pageX - this.progress.offsetLeft) + 'px';
					}}
				/>

				<div className="time-duration">
					<span
						ref={node => { if (node) { this.timeDisplay = node; } }}
					>
					</span>
					{dur ? ' / '+ dur : ''}
				</div>

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

	onEnded() {
		const props = this.props;
		this.progressBar.style.width = '0%';
		this.bufferBar.style.width = '0%';
	
		if (props.upnext.length > 0) {
			props.onNextTrack(props.lib, props.index, props.playback.mode, props.upnext, props.playback.track['PId']);
		}
		else { 
			props.onPlaybackChange(pS.IDLE);
		}
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

	calcTime(ss) {
		const h = 3600;
		const m = 60;

		const mH = (s, u) => Math.floor(s/u);	
		let hr = mH(ss, h);
		const s = ss - (hr * h) >= 0 ? ss - (hr * h) : ss;
		let min = mH(s, m) > 0 ? mH(s, m) : 0;
		let sec = ss - ((hr * h) + (min * m)) >= 0 ? ss - ((hr * h) + (min * m)) : ss;

		if (sec < 10) { sec = '0' + sec; }
		if (hr > 0 && min < 10) { min = '0' + min; }
		hr = hr ? hr + ':' : '';

		return `${hr}${min}:${sec}`;
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

Playback.contextTypes = {
	store: PropTypes.object
}

export default PlaybackControls;