const playback = (
	playback = {
		state: '',
		mode: 'normal',
		track: '',
		volume: 1
	}, action) => {
	switch (action.type) {
		case 'PLAY_TRACK':
			return {...playback,
				track: action.track
			}
		case 'SET_PLAYBACK':
			return {...playback,
				state: action.state
			}
		case 'TOGGLE_PLAYBACK':
			if ( playback.state === 'pause' ) {
				return {...playback,
					state: 'play'
				}
			} 
			else {
				return {...playback,
					state: 'pause'
				}
			}
		case 'SET_PLAYMODE':
			if (playback.mode === 'normal') { 
				return {...playback,
					mode: 'repeat'
				}
			}
			else if (playback.mode === 'repeat') { 
				return {...playback,
					mode: 'refresh'
				}
			}
			else if (playback.mode === 'refresh') { 
				return {...playback,
					mode: 'random'
				}
			}
			else { 
				return {...playback,
					mode: 'normal'
				}
			}
		case 'SET_VOL': 
			return {...playback,
				volume: action.volume
			}
		default:
			return playback;
	}
}

export default playback;