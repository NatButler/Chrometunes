import { lib } from './library';

const initState = (store) => {
	store.dispatch({
		type: 'IMPORT_LIB',
		id: lib.id,
		genres: lib.genres,
		tracks: lib.tracks
	});
}

export default initState