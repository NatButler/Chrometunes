import React from 'react';
import NavBar from './navBar/NavBar';
import Table from './trackList/table';
import SidePanel from './sidePanel/sidePanel';

const App = () => (
	<div>
		<NavBar />
		<Table />
		<SidePanel />
	</div>
);

export default App;