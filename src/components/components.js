import React from 'react';
const { Component } = React;


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
	type: React.PropTypes.string,
	label: React.PropTypes.string,
	className: React.PropTypes.string,
	icon: React.PropTypes.string,
	disabled: React.PropTypes.string,
	handler: React.PropTypes.func.isRequired
}

Button.defaultProps = {
	type: 'button',
	className: 'btn btn-default active ',
	label: ''
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
				ref={(node) => this.audioEl = node}
				src={this.props.src}
				onEnded={this.props.handler}
			>
			</audio>
		);
	}
}

Audio.propTypes = {
	className: React.PropTypes.string,
	autoPlay: React.PropTypes.string,
	children: React.PropTypes.array,
	listenInterval: React.PropTypes.number,
	onAbort: React.PropTypes.func,
	onCanPlay: React.PropTypes.func,
	onCanPlayThrough: React.PropTypes.func,
	onEnded: React.PropTypes.func,
	onError: React.PropTypes.func,
	onListen: React.PropTypes.func,
	onPause: React.PropTypes.func,
	onPlay: React.PropTypes.func,
	onSeeked: React.PropTypes.func,
	preload: React.PropTypes.string,
	src: React.PropTypes.string
}

Audio.defaultProps = {
	autoPlay: 'true',
	src: ''
}