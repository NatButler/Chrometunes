import React from 'react';
import UpNext from './upnext';
import Playlists from './playlists';
import Playback from './playback';


const SidePanel = ({store}) => {
	let state = store.getState();
	return (
		<div className="col-md-3" id="side-panel">
           	<Playback store={store} />
			<ul className="nav nav-pills">
                <li className="active">
                	<a data-toggle="pill" href="#up-next" role="tab">
                		<span className="glyphicon glyphicon-list"></span>
                	</a>
                </li>
                <li>
                	<a data-toggle="pill" href="#playlists" role="tab">
                		<span className="glyphicon glyphicon-folder-open"></span>
                	</a>
                </li>
            </ul>
            
            <div className="tab-content">
	            <UpNext store={store} />
	            <Playlists store={store} playlists={state.playlists} />
	        </div>
           	
		</div>
	);
}


export default SidePanel