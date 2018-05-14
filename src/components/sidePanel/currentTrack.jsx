import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from './upNextItems';
import Button from '../Button';
import * as pS from '../../constants/playStates';
import { playerController } from '../../cast';

class NowPlaying extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.playback.mode === nextProps.playback.mode;
	}

	render() {
		console.log('Current track.');
		const { track, status } = this.props.playback;
		const audio = document.getElementById('player');
		const details = (track) ? <Item trk={track} /> : null;
		const loading = (status === pS.LOADING) ? <img className="loading" src="img/loading.gif" /> : null;

		return (
			<div id="current-track" className={(track) ? '' : 'not-loaded'}>
				<Button
					icon={(status === pS.PLAY) ? pS.PAUSE : pS.PLAY}
					className="playback"
					disabled={status === pS.LOADING || !track}
					handler={() => {
						(status === pS.PLAY) ? audio.pause() : audio.play();
						playerController.playOrPause();
					}}
				/>
				{details}
				{loading ||
					<Button
						icon="info-sign"
						className="info"
						handler={() => {
							$('#tabs a[href="#info"]').tab('show');
						}}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	playback: state.playback.nowPlaying
});

export default connect(mapStateToProps)(NowPlaying);