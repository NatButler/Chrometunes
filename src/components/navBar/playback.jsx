import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { playTrack, setPlayback, togglePlaymode, togglePlayback } from '../../actions/actions';
import * as playstate from '../../constants/playStates';
import * as playmode from '../../constants/playModes';
import AudioPlayer from '../Audio';
import Button from '../Button';
import { loadMedia, player, playerController } from '../../cast';

class Playback extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		const props = this.props;
		if (props.playback.mode !== nextProps.playback.mode) {
			return true;
		} 
		else if (props.upnext.length && !nextProps.upnext.length) {
			return true;
		}
		else if (!props.upnext.length && nextProps.upnext.length) {
			return true;
		}
		else {
			return props.playback.track.PId !== nextProps.playback.track.PId;
		}
	}

	render() {
		console.log('Rendering Playback.');
		const audioElem = document.getElementById('player');
		const playback = this.props.playback;
		const upnext = this.props.upnext;
		const { store } = this.context;
		let src;
		if (playback.track) {
			src = this.audioSrc(this.props.serverAdd, playback.track.Location);
			this.cast(src, playback.track.Type);
		}

 		return (
 			<div className="playback">
				<Button
					className={'btn btn-default skip '} 
					icon="step-forward"
					disabled={!upnext.length && playback.mode !== playmode.REPEAT1 ? 'disabled' : ''}
					handler={ () => {
						if (playback.mode !== playmode.REPEAT1) {
							store.dispatch( playTrack(playback.mode, upnext, playback.track) );
						} else {
							audioElem.load();
						}
					}}
				/>

				<AudioPlayer
					className="audio"
					src={src}
					endedHandler={ () => {
						if (playback.mode !== playmode.REPEAT1 && upnext.length > 0) {
							store.dispatch( playTrack(playback.mode, upnext, playback.track) );
						}
						else if (playback.mode === playmode.REPEAT1) {
							audioElem.load();
						}
						else {
							store.dispatch( setPlayback(playstate.STOPPED) );
						}
					}}
					playHandler={ () => { this.playToggle(); }}
					pauseHandler={ () => { this.playToggle(); }}
					// errorHandler={ err => { console.error('Error:', err); }}
				/>

				<Button
	        className={'btn btn-default playmode ' + playback.mode}
					icon={(playback.mode === playmode.NORMAL) ? playmode.REPEAT : playback.mode}
					handler={ () => { store.dispatch( togglePlaymode() ); }}
				/>
			</div>
		);
	}

	audioSrc(server, dir) {
		return server + dir.slice(dir.indexOf('iTunes'));
	}

	playToggle() {
		const { store } = this.context;
		store.dispatch( togglePlayback() );
		if (player.isPaused) { playerController.playOrPause(); }
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
	playback: state.playback,
	upnext: state.upnext,
	serverAdd: state.app.serverAdd
});

Playback.contextTypes = {
	store: PropTypes.object
}

// const mapDispatchToProps = store.dispatch => {
// 	return {

// 	}
// };

export default connect(mapStateToProps)(Playback);