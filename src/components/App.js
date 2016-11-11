import React from 'react';
import Header from './header';
import Table from './table';
import SidePanel from './sidePanel';


const App = ({store}) => (
	<div>
		<Header store={store} />
		<Table store={store} />
		<SidePanel store={store} />
	</div>
);


export default App