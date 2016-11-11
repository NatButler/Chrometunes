import { createStore } from 'redux';
import mediaApp from './reducers/reducer';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';


const configureStore = () => {
	const persistedState = loadState();
	const store = createStore(
					mediaApp, 
					persistedState, 
					window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
				);


	store.subscribe(throttle( () => {
		let state = store.getState();
		saveState(state);
	}), 1000);

	return store;
}

export default configureStore


// {
// 	playlists: state.playlists,
// 	upnext: state.upnext,
// 	playback: state.playback,
// 	playmode: state.playmode
// }