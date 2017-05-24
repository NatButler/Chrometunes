import { createStore } from 'redux';
import mediaApp from './reducers/reducer';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import { loadLibrary } from './libraryLoad';
import getIP from './getIP';
import { importLib, setServerUrl } from './actions/actions';

const addLoggingToDispatch = store => {
	const rawDispatch = store.dispatch;
	if (!console.group) { return rawDispatch; }
	return action => {
		console.group(action.type);
		console.log('%c prev state', 'color: gray', store.getState());
		console.log('%c action', 'color: blue', action);
		const returnValue = rawDispatch(action);
		console.log('%c next state', 'color: green', store.getState());
		console.groupEnd(action.type);
	}
}

const configureStore = () => {
	return new Promise(resolve => {
		const library = loadLibrary();
		let server;
		getIP().then(addr => { server = 'http://' + addr + ':8080/'; });

		library.then(lib => {

			// Serve library directory: lib.dir

			const persistedState = loadState(lib.id);

			persistedState.then(state => {
				const store = createStore(
					mediaApp,
					state, 
					window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
				);

				if (process.env.NODE_ENV !== 'production') {
					store.dispatch = addLoggingToDispatch(store);
				}

				store.dispatch( setServerUrl(server) );
				store.dispatch( importLib(lib) ); 

				store.subscribe(throttle( () => {
					saveState( store.getState() );
				}, 2000, {'leading': true} ));

				resolve(store);
			});
		})
		.catch(reason => {
			console.error(reason);
		});
	});
}

export default configureStore;