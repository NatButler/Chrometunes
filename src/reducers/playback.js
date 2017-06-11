import { combineReducers } from 'redux';
import upnext from './upnext';
import * as playstate from '../constants/playStates';
import * as playmode from '../constants/playModes';

const nowPlaying = (
	nowPlaying = {
		status: playstate.IDLE,
		mode: playmode.NORMAL,
		track: undefined
	}, action) => {
	switch (action.type) {
		case 'PLAY_TRACK':
			upnext(undefined, action);
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
				case playstate.IDLE:
					return {...nowPlaying,
						track: undefined,
						status: playstate.IDLE
					}
				default:
					return {...nowPlaying,
						status: action.state
					}					
			}
		case 'TOGGLE_PLAYBACK_STATE':
			if ( nowPlaying.status !== playstate.PLAY ) {
				return {...nowPlaying,
					status: playstate.PLAY
				}
			}
			else {
				return {...nowPlaying,
					status: playstate.PAUSE
				}
			}
		case 'SET_PLAYMODE':
			return {...nowPlaying,
				mode: action.mode
			}
		case 'TOGGLE_PLAYMODE':
			switch(nowPlaying.mode) {
				case playmode.NORMAL:
					return {...nowPlaying,
						mode: playmode.REPEAT
					}
				case playmode.REPEAT:
					return {...nowPlaying,
						mode: playmode.REPEAT1
					}
				case playmode.REPEAT1:
					return {...nowPlaying,
						mode: playmode.SHUFFLE
					}
				default:
					return {...nowPlaying,
						mode: playmode.NORMAL
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