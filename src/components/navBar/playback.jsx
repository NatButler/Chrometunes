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
		this.volume;
		this.progressBar;
		this.bufferBar;
		this.timeDisplay;
		this.state = {
			status: pS.PAUSE,
			canPlay: false,
			mute: false,
			src: '',
			type: ''
		}

		playerController.addEventListener(
			cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, () => {
				if (player.isConnected) {
					this.audio.muted = true;
					if (this.state.src) {
						this.cast(this.state.src, this.state.type);
					}
				} else {
					this.audio.muted = false;
				}
			}
		);

		playerController.addEventListener(
			cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, () => {
				this.volume.value = player.volumeLevel;
			}
		);

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.playback.status === pS.LOADING) {
			this.progressBar.style.width = '0%';
			this.bufferBar.style.width = '0%';
			this.state.src = this.audioSrc(nextProps.server, nextProps.playback.track['Location']);
			this.state.type = nextProps.playback.track['Type'];
			if (player.isConnected) {
				this.cast(this.state.src, this.state.type);
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.playback.track !== undefined || this.props.playback.track !== nextProps.playback.track || this.state.mute !== nextState.mute || this.props.playback.mode !== nextProps.playback.mode;
	}

	render() {
		console.log('Playback.');
		const props = this.props;
		const { playback, lib, index, upnext } = this.props;
		const loop = playback.mode === pM.REPEAT1 || playback.mode === pM.REPEAT && !upnext.length || playback.mode === pM.SHUFFLE && !upnext.length;
		if (loop) {
			// setCastToRepeat1
		}
		let dur;
		if (playback.track) {
			dur = playback.track['Duration'];
		}	

		// Removal of audio elem to only function as chromecast player

 		return (
 			<div className="playback">
 				<Audio
					ref={ component => { this.audio = findDOMNode(component) }}
					className="audio"
					src={this.state.src}
					loop={loop}
					errorHandler={() => { 
						// Feedback/warning in app needed
						console.log('Error loading.'); 
					}}
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
							if (playback.mode !== pM.REPEAT1) { 
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
							playerController.playOrPause();
						}}
					/>
					<Button
						className="mute"
						icon={this.state.mute ? 'volume-off' : 'volume-up'}
						disabled={player.isConnected}
						handler={() => { this.handleMute(); }}
					/>
					<input
						ref={node => {this.volume = node}}
						type="range"
						name="volume"
						min="0.0"
						max="1.0"
						step="0.01"
						autoComplete="false"
						onChange={e => {
							this.audio.volume = e.target.value;
							player.volumeLevel = +e.target.value;
							if (player.isConnected) {
	  						playerController.setVolumeLevel();
							}
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
					castAudio={playerController}
					castPlayer={player}
					onMouseMove={e => {
						this.position.style.width = (e.pageX - this.progress.offsetLeft) + 'px';
					}}
				/>

				<div className="time-duration">
					<span ref={node => { if (node) { this.timeDisplay = node; } }}></span>
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
		if (!player.isMediaLoaded) {
			console.log('Cast: loading media.');
			this.audio.pause();
			player.currentTime = this.audio.currentTime;
			loadMedia(src, type, this.audio);
		} else {
			if (player.mediaInfo.contentId !== src) {
				console.log('Cast: loading media.');
				this.audio.pause();
				player.currentTime = this.audio.currentTime;
				loadMedia(src, type, this.audio);
			} else {
				playerController.playOrPause();
				this.audio.play();
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