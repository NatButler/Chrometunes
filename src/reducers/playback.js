import { combineReducers } from 'redux';
import upnext from './upnext';
import * as pS from '../constants/playStates';
import * as pM from '../constants/playModes';

const nowPlaying = (
	nowPlaying = {
		status: pS.IDLE,
		mode: pM.NORMAL,
		track: undefined
	}, action) => {
	switch (action.type) {
		case 'PLAY_TRACK':
			return {...nowPlaying,
				track: action.track
			}
		case 'PLAY_FROM': {
			return {...nowPlaying,
				track: action.track
			}
		}
		case 'SET_PLAYBACK_STATE':
			switch(action.state) {
				case pS.IDLE:
					return {...nowPlaying,
						track: undefined,
						status: pS.IDLE
					}
				default:
					return {...nowPlaying,
						status: action.state
					}					
			}
		case 'TOGGLE_PLAYBACK_STATE':
			if ( nowPlaying.status !== pS.PLAY ) {
				return {...nowPlaying,
					status: pS.PLAY
				}
			}
			else {
				return {...nowPlaying,
					status: pS.PAUSE
				}
			}
		case 'SET_PLAYMODE':
			return {...nowPlaying,
				mode: action.mode
			}
		case 'TOGGLE_PLAYMODE':
			switch(nowPlaying.mode) {
				case pM.NORMAL:
					return {...nowPlaying,
						mode: pM.REPEAT
					}
				case pM.REPEAT:
					return {...nowPlaying,
						mode: pM.REPEAT1
					}
				case pM.REPEAT1:
					return {...nowPlaying,
						mode: pM.SHUFFLE
					}
				default:
					return {...nowPlaying,
						mode: pM.NORMAL
					}
			}
		default:
			return nowPlaying;
	}
}

const playback = combineReducers({
	nowPlaying,
	upnext
});

export default playback;