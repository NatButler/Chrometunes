export const loadState = libId => {
	try {
		return new Promise(resolve => {
			chrome.storage.local.get(libId, state => {
				if (state === null) {
					return undefined;
				}
				resolve(state[libId].playlists);
			});
		});	
	} catch(err) {
		return undefined;
	}
}

export const saveState = state => {
	const save = {
		playlists: state.playlists
	};
	try {
		chrome.storage.local.set({[state.library.id]: save}, () => {
			// Log success
			console.log('State saved.');
		});
	} catch(err) {
		// Ignore write errors.
		console.error(err);
	}
}