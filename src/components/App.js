import React from 'react';
import Header from './header';
import Table from './table';
import SidePanel from './sidePanel';
import Footer from './footer';


const App = ({store, state}) => (
	<div>
		<div className="wrap">
			<Header store={store}  />
			<Table store={store} state={state} />
			<SidePanel store={store} state={state} />
		</div>
		<Footer store={store} state={state} />
	</div>
);

export default App