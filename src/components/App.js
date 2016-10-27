import React from 'react';
import Header from './header';
import Table from './table';
import SidePanel from './sidePanel';


const App = ({store, state}) => (
	<div>
		<Header store={store} state={state} />
		<Table store={store} state={state} />
		<SidePanel store={store} state={state} />
	</div>
);

export default App