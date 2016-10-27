import React from 'react';
import UpNext from './upnext';
import Playlists from './playlists';
import Footer from './footer';


const SidePanel = ({store, state}) => {
	return (
		<div className="col-md-3" id="side-panel">
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
	            <UpNext store={store} state={state} />
	            <Playlists store={store} playlists={state.playlists} />
	            <Footer store={store} state={state} />
	        </div>
		</div>
	);
}


export default SidePanel