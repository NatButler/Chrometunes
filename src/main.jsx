import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';

const config = configureStore().then(store => {
	const renderer = () => {
		render(
			<Root store={store} />, 
			document.getElementById('root')
		);
	}
	renderer();
	store.subscribe(renderer);
});