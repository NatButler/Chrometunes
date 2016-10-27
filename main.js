import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import mediaApp from './src/reducers/reducer';
import initState from './src/initState';
import App from './src/components/App';

const store = createStore(mediaApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
initState(store);

store.subscribe(render);
render();

function render() {
	console.log('Current state.');
	console.log(store.getState());
	console.log('--------------');

	ReactDOM.render(
		<App store={store} state={store.getState()} />, 
		document.getElementById('root')
	);
}