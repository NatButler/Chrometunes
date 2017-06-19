import React from 'react';
import LoadScreen from './loadScreen';
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