import React from 'react';
import NavBar from './navBar/NavBar';
import Table from './table/table';
import SidePanel from './sidePanel/sidePanel';

const App = () => (
	<div>
		<NavBar />
		<div>
			<div className="collapse" id="collapseExample">
			  <div className="well">
			    <span className="warning"></span>
			  </div>
			</div>
			<Table />
		</div>
		<SidePanel />
	</div>
);

export default App;