const playback = (
	playback = {
		state: '',
		track: '',
		volume: 1
	}, action) => {
	switch (action.type) {
		case 'PLAY_TRACK':
			return Object.assign({}, playback, {
				track: action.track
			});
		case 'SET_PLAYBACK':
			return Object.assign({}, playback, {
				state: action.state
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
		case 'SET_VOL': 
			return Object.assign({}, playback, {
				volume: action.volume
			});
		default:
			return playback;
	}
}

export default playback