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
	try {
		chrome.storage.local.set({[state.library.id]: state}, () => {
			// console.log('State saved:', state);
		});
	} catch(err) {
		// Ignore write errors.
	}
}