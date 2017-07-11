import React from 'react';
import { render } from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root';
import { castInit } from './cast';
import { loadLibrary, obtainIP } from './actions/actions';

if (typeof window !== 'undefined') {
	window.React = React;
}

castInit();

const store = configureStore();
store.dispatch( loadLibrary() );
// store.dispatch( obtainIP() );

render(
	<Root store={store} />, 
	document.getElementById('root')
);
