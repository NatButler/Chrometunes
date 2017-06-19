import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import { castInit } from './cast';
import { loadLibrary } from './actions/actions';

// const config = configureStore().then(store => {
// 	const renderer = () => {
// 		render(
// 			<Root store={store} />, 
// 			document.getElementById('root')
// 		);
// 	}
// 	renderer();
// 	store.subscribe(renderer);
// });

if (typeof window !== 'undefined') {
	window.React = React;
}

castInit();

const store = configureStore();
render(
	<Root store={store} />, 
	document.getElementById('root')
);

store.dispatch( loadLibrary() );