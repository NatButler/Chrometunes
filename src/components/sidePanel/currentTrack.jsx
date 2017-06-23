import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from './upNextItems';
import Button from '../Button';
import * as playstate from '../../constants/playStates';

class NowPlaying extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.playback.mode === nextProps.playback.mode;
	}

	render() {
		console.log('Current track.');
		const audio = document.getElementById('player');
		const playback = this.props.playback;
		const track = (playback.track) ? <Item trk={playback.track} /> : <div></div>;

		return (
			<div id="current-track" className={(playback.track) ? '' : 'not-loaded'}>
				<Button
					icon={(playback.status === playstate.PLAY) ? playstate.PAUSE : playstate.PLAY}
					className="playback"
					disabled={!playback.track}
					handler={() => {
						(playback.status === playstate.PLAY) ? audio.pause() : audio.play();
					}}
				/>
				{track}
				<Button
					icon="info-sign"
					className="info"
					handler={() => {
						$('#tabs a[href="#info"]').tab('show');
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	playback: state.playback.nowPlaying
});

export default connect(mapStateToProps)(NowPlaying);