import * as playmodes from '../constants/playModes';

const playback = (
	playback = {
		state: 'disabled',
		mode: playmodes.NORMAL,
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
			return {...playback,
				mode: action.mode
			}
		case 'TOGGLE_PLAYMODE':
			if (playback.mode === playmodes.NORMAL) { 
				return {...playback,
					mode: playmodes.REPEAT
				}
			}
			else if (playback.mode === playmodes.REPEAT) { 
				return {...playback,
					mode: playmodes.REPEAT1
				}
			}
			else if (playback.mode === playmodes.REPEAT1) { 
				return {...playback,
					mode: playmodes.SHUFFLE
				}
			}
			else { 
				return {...playback,
					mode: playmodes.NORMAL
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