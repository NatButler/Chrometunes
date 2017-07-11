import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
	constructor() {
		super();
		this.progress;
	}
	
	render() {
		return (
			<div 
				className="progress"
				ref={node => this.progress = node}
				onClick={e => {
					if (this.props.audio && this.props.audio.src) {
						let clickPos = (e.pageX - this.progress.offsetLeft) / this.progress.offsetWidth;
						let clickTime = clickPos * this.props.audio.duration;
						this.props.audio.currentTime = clickTime;
					}
				}}
				onMouseEnter={e => {
					if (this.props.audio && this.props.audio.src) {
						this.position.style.visibility = 'visible';
					}
				}}
				onMouseLeave={e => {
					if (this.props.audio && this.props.audio.src) {
						this.position.style.visibility = 'hidden';
					}
				}}
				onMouseMove={e => {
					if (this.props.audio && this.props.audio.src) {
						this.position.style.width = (e.pageX - this.progress.offsetLeft) + 'px';
					}
				}}
			>
				<div
					ref="progress"
					className="progress-bar" 
					role="progressbar"
				>
				</div>
				<div
					ref={node => this.position = node}
					className="position-bar"
					role="progressbar"
				>	
				</div>
				<div
					ref="buffer"
					className="buffered-bar"
					role="progressbar"
				>
				</div>
			</div>
		);
	}
}

ProgressBar.propTypes = {
	audio: PropTypes.object
}

export default ProgressBar;