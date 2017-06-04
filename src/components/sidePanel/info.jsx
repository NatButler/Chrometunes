import React, { Component } from 'react';
import { connect } from 'react-redux';

class Info extends Component {
	render() {
		console.log('Rendering Info.');
		const track = this.props.track;
		let infoList = <li className="warning">No track info to display.</li>;
		if (track) {
			infoList = Object.keys(track).map( (key, i) => {
				let prop = track[key];
				if (key === 'Location') { prop = prop.replace(/%20/g, ' '); }
				return <li key={i}><span className="infoKey">{key}</span>: {prop}</li>;
			});
		}

		return (
			<div id="info" className="tab-pane" role="tab-pane">
				<ul>{infoList}</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	track: state.playback.track
});

export default connect(mapStateToProps)(Info);