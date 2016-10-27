const playback = (
	playback = {
		state: '',
		track: ''
	}, action) => {
	switch (action.type) {
		case 'CURRENT_TRACK':
			return Object.assign({}, playback, {
				track: action.track,
				state: 'play'
			});
		case 'TOGGLE_PLAYBACK':
			if ( playback.state == 'pause' ) {
				return Object.assign({}, playback, {
					state: 'play'
				});
			} 
			else {
				return Object.assign({}, playback, {
					state: 'pause'
				});
			}
		default:
			return playback;
	}
}

export default playback