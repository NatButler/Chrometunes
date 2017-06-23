import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class AudioPlayer extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.src !== nextProps.src || this.props.loop !== nextProps.loop;
	}

	render() {
		console.log('Audio.');
		return(
			<audio
				id="player"
				className={this.props.className}
				autoPlay={this.props.autoPlay}
				preload={this.props.preload}
				controls={this.props.controls}
				loop={this.props.loop}
				muted={this.props.muted}
				src={this.props.src}
				onEnded={this.props.endedHandler}
				onPlay={this.props.playHandler}
				onPause={this.props.pauseHandler}
				onError={this.props.errorHandler}
				onAbort={this.props.abortHandler}
				onCanPlay={this.props.canPlayHandler}
				onTimeUpdate={this.props.progressHandler}
			>
			</audio>
		);
	}
}

AudioPlayer.propTypes = {
	className: PropTypes.string,
	autoPlay: PropTypes.bool,
	children: PropTypes.array,
	listenInterval: PropTypes.number,
	onTimeUpdate: PropTypes.func,
	onAbort: PropTypes.func,
	onCanPlay: PropTypes.func,
	onCanPlayThrough: PropTypes.func,
	onEnded: PropTypes.func,
	onError: PropTypes.func,
	onListen: PropTypes.func,
	onPause: PropTypes.func,
	onPlay: PropTypes.func,
	onSeeked: PropTypes.func,
	preload: PropTypes.string,
	loop: PropTypes.bool,
	muted: PropTypes.bool,
	src: PropTypes.string
}

AudioPlayer.defaultProps = {
	autoPlay: true,
	loop: false,
	muted: false,
	preload: 'auto',
	controls: false,
	src: ''
}

export default AudioPlayer;