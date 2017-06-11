import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import { castInit } from './cast';
import Root from './components/Root';

castInit();

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