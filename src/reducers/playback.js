import upnext from './upnext';
import * as playstate from '../constants/playStates';
import * as playmode from '../constants/playModes';

const playback = (
	playback = {
		status: playstate.IDLE,
		mode: playmode.NORMAL,
		track: '',
		volume: 1
	}, action) => {
	switch (action.type) {
		case 'PLAY_TRACK':
			upnext(undefined, action);
			return {...playback,
				track: action.track
			}
		case 'PLAY_FROM': {
			return {...playback,
				track: action.track
			}
		}
		case 'SET_PLAYBACK_STATE':
			switch(action.state) {
				case playstate.IDLE:
					return {...playback,
						track: '',
						status: playstate.IDLE
					}
				default:
					return {...playback,
						status: action.state
					}					
			}
		case 'TOGGLE_PLAYBACK_STATE':
			if ( playback.status !== playstate.PLAY ) {
				return {...playback,
					status: playstate.PLAY
				}
			}
			else {
				return {...playback,
					status: playstate.PAUSE
				}
			}
		case 'SET_PLAYMODE':
			return {...playback,
				mode: action.mode
			}
		case 'TOGGLE_PLAYMODE':
			if (playback.mode === playmode.NORMAL) { 
				return {...playback,
					mode: playmode.REPEAT
				}
			}
			else if (playback.mode === playmode.REPEAT) { 
				return {...playback,
					mode: playmode.REPEAT1
				}
			}
			else if (playback.mode === playmode.REPEAT1) { 
				return {...playback,
					mode: playmode.SHUFFLE
				}
			}
			else { 
				return {...playback,
					mode: playmode.NORMAL
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