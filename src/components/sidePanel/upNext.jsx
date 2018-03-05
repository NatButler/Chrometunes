import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpNextItem } from './upNextItems';
import Controls from './controls';

class UpNext extends Component {
	// Commented out because doesn't allow for drag n drop rerender
	// shouldComponentUpdate(nextProps) {
	// 	const { upnext } = this.props;
	// 	return upnext[0] !== nextProps.upnext[0] || upnext[upnext.length-1] !== nextProps.upnext[nextProps.upnext.length-1] || upnext.length !== nextProps.upnext.length;
	// }

	render() {
		console.log('UpNext.');
		const list = this.props.upnext.map((trk, i) => {
			return <UpNextItem key={i} trk={this.props.lib[this.props.index.indexOf(trk)]} idx={i} />;
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
	upnext: state.playback.upnext,
	lib: state.library.tracks,
	index: state.library.index
});

const Help = () => (
	<li className="help">
		<p>Double click a row to play a track. Click an 'Album' or 'Title' to add to the list. Save a list by clicking 'SAVE'. Clear a list by clicking 'CLEAR'. Drag and drop list items to reorder playlist.</p>
	</li>
);

export default connect(mapStateToProps)(UpNext);