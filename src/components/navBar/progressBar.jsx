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
			>
				<div
					ref="progress"
					className="progress-bar" 
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