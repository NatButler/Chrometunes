const playback = (state = 'PAUSED', action) => {
	switch (action.type) {
		case 'TOGGLE_PLAYBACK':
			if ( state.playback == 'PAUSED' ) {
				return 'PLAYING';
			} else {
				return 'PAUSED'
			}
		default:
			return state;
	}
}

export default playback