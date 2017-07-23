export const loadState = libId => {
	return new Promise(resolve => {
		chrome.storage.local.get(libId, state => {
			if (state[libId] === undefined) {
				return undefined;
			}
			resolve(state[libId]);
		});
	});
}

export const saveState = state => {
	const save = {
		playlists: state.playlists
	};
	try {
		chrome.storage.local.set({[state.library.id]: save}, () => {
			console.log('State saved.');
		});
	} catch(err) {
		console.error(err);
	}
}