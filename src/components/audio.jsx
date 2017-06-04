import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class AudioPlayer extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.src !== nextProps.src;
	}

	render() {
		console.log('Rendering audio.');
		return(
			<audio
				id="player"
				className={this.props.className}
				autoPlay={this.props.autoPlay}
				preload={this.props.preload}
				controls
				ref={node => { this.audioEl = node; }}
				src={this.props.src}
				onEnded={this.props.endedHandler}
				onPlay={this.props.playHandler}
				onPause={this.props.pauseHandler}
				onError={this.props.errorHandler}
				onAbort={this.props.abortHandler}
			>
			</audio>
		);
	}
}

AudioPlayer.propTypes = {
	className: PropTypes.string,
	autoPlay: PropTypes.string,
	children: PropTypes.array,
	listenInterval: PropTypes.number,
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
	src: PropTypes.string
}

AudioPlayer.defaultProps = {
	autoPlay: 'false',
	src: ''
}

export default AudioPlayer;