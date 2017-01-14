import React, { PropTypes } from 'react';
import Header from '../components/header';
import Table from '../components/table';
import SidePanel from '../components/sidePanel';


const App = ({store}) => (
	<div>
		<Header store={store} />
		<Table store={store} />
		<SidePanel store={store} />
	</div>
);

App.propTypes = {
	store: PropTypes.object.isRequired
}


export default App