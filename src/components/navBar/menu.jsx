import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from './menuItem';
import Button from '../Button';
import { loadLibrary } from '../../libraryLoad';
import { setPlaymode } from '../../actions/actions';
import * as playmode from '../../constants/playModes';

class Menu extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return !nextProps.isUpnext || !nextProps.isPlaylists || this.props.playmode !== nextProps.playmode;
	}

	render() {
		console.log('Rendering Menu.');
		const props = this.props;
		const { store } = this.context;
		
		return (
	    <div className="dropdown">
				<Button
					className="dropdown-toggle btn btn-secondary"
					id="dropdownMenuButton"
					dataToggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					icon="option-vertical"
					handler={ () => {  }}
				/>

				<ul
					className="dropdown-menu dropdown-menu-right"
					aria-labelledby="dropdownMenu1"
				>
			  	<MenuItem
			  		title="Load library"
			  		handler={e => {
			  			loadLibrary(); 
			  			e.preventDefault(); 
			  		}}
			  	/>
			  	<MenuItem
			  		title="Load playlist"
			  		status={props.isPlaylists ? '' : 'disabled'}
			  		handler={e => { 
			  			$('#tabs a[href="#playlists"]').tab('show');
			  			e.preventDefault(); 
			  		}}
			  	/>
					<MenuItem
			  		title="Save playlist"
			  		status={props.isUpnext ? '' : 'disabled'}
			  		handler={e => { 
					  	this.searchInput.focus();
			  			e.preventDefault(); 
			  		}}
			  	/>
			  	<li role="separator" className="divider"></li>
			  	<li className="dropdown-submenu">
				    <a className="dropdown-item" href="#">Playmode</a>
						<ul className="dropdown-menu dropdown-menu-right">
							<MenuItem
					  		title="Repeat"
					  		status={props.playMode === playmode.REPEAT ? 'selected' : ''}
					  		handler={e => { 
					  			store.dispatch( setPlaymode(playmode.REPEAT) ); 
			  					e.preventDefault(); 
					  		}}
					  	/>
							<MenuItem
					  		title="Repeat 1"
					  		status={props.playMode === playmode.REPEAT1 ? 'selected' : ''}
					  		handler={e => { 
					  			store.dispatch( setPlaymode(playmode.REPEAT1) );
			  					e.preventDefault();
					  		}}
					  	/>
					  	<MenuItem
					  		title="Shuffle"
					  		status={props.playMode === playmode.SHUFFLE ? 'selected' : ''}
					  		handler={e => { 
					  			store.dispatch( setPlaymode(playmode.SHUFFLE) );
			  					e.preventDefault(); 
					  		}}
					  	/>
	  				</ul>
	  			</li>
			  	<li role="separator" className="divider"></li>
			  	<li><a className="dropdown-item" href="#">Cast...</a></li>
			  	<li role="separator" className="divider"></li>
			  	<li className="dropdown-submenu">
				    <a className="dropdown-item" href="#">View</a>
						<ul className="dropdown-menu dropdown-menu-right">
					  	<li><a className="dropdown-item" href="#">Compact</a></li>
					  	<li><a className="dropdown-item" href="#">Night mode</a></li>
					  </ul>
					</li>
			  	<li role="separator" className="divider"></li>
					<li><a className="dropdown-item" href="#">Console</a></li>
			  	<li role="separator" className="divider"></li>
			  	<li><a className="dropdown-item" href="#">Help</a></li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	playMode: state.playback.mode,
	isUpnext: state.upnext.length,
	isPlaylists: state.playlists.length
});

Menu.contextTypes = {
	store: PropTypes.object
}

export default connect(mapStateToProps)(Menu);