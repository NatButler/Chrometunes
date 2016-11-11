import React, { Component, PropTypes } from 'react';


export class Button extends Component {
	render() {
		let icon = this.props.icon !== '' ? <span className={'glyphicon glyphicon-' + this.props.icon}></span> : '',
			label = this.props.label !== '' ? <label>{this.props.label}</label> : '';
		
		return (
			<button
				type={this.props.type}
				className={this.props.className}
				disabled={this.props.disabled}
				onClick={this.props.handler}
			>
				{icon}
				{label}
			</button>
		);
	}
}

Button.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
	icon: PropTypes.string,
	disabled: PropTypes.string,
	handler: PropTypes.func.isRequired
}

Button.defaultProps = {
	type: 'button',
	className: 'btn btn-default active ',
	label: '',
	icon: ''
}


export class Audio extends Component {
	render() {
		return (
			<audio
				id="player"
				className={this.props.className}
				autoPlay={this.props.autoPlay}
				preload={this.props.preload}
				controls
				ref={ (node) => {
					// this.audioEl = node;
					this.handleControls(node);
				}}
				src={this.props.src}
				onEnded={this.props.endedHandler}
				onPlay={this.props.playHandler}
				onPause={this.props.pauseHandler}
			>
			</audio>
		);
	}

	handleControls(elem) {
		// volume
		// position
		// duration
	}
}

Audio.propTypes = {
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

Audio.defaultProps = {
	autoPlay: 'true',
	src: ''
}