import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpNextItem } from './upNextItems';
import Controls from './controls';

class UpNext extends Component {
	// shoudlComponentUpdate(nextProps) {
	// // Requires array compare (immutable.js)
	// 	return this.props.upnext[0].PId !== nextProps.upnext[0].PId;
	// }

	render() {
		console.log('Rendering UpNext.');
		const list = this.props.upnext.map( (trk, i) => {
			return <UpNextItem key={i} trk={trk} idx={i} />;
		});

		return (
			<div id="up-next" className="tab-pane active" role="tab-pane">
				<Controls isDisabled={!list.length} />
				<ul id="up-next-ul">{(list.length) ? list : <Help />}</ul>
			</div>
		);		
	}
}

const mapStateToProps = state => ({
	upnext: state.playback.upnext
});

const Help = () => (
	<li className="help">
		<p>Double click a row to play a track. Click an 'Album' or 'Title' to add to the list. Save a list by clicking 'SAVE'. Clear a list by clicking 'CLEAR'.</p>
	</li>
);

export default connect(mapStateToProps)(UpNext);