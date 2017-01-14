import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import App from './containers/App';


const store = configureStore();
store.subscribe(render);
render();

function render() {
	ReactDOM.render(
		<App store={store} />, 
		document.getElementById('root')
	);	
}	