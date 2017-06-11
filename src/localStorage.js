export const loadState = libID => {
	try {
		return new Promise(resolve => {
			chrome.storage.local.get(libID, state => {
				if (state === null) {
					return undefined;
				}
				resolve(state[libID]);
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
		});
	} catch(err) {
		// Ignore write errors.
		console.error(err);
	}
}