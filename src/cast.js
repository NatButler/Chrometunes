const getCastSession = () => {
	return cast.framework.CastContext.getInstance().getCurrentSession();
}

// Initialize
export const castInit = () => {
	const initializeCastApi = () => {
		if ( getCastSession() ) {
			console.log('Cast: closing session.');
			stopCasting();
		}

		cast.framework.CastContext.getInstance().setOptions({
			receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
			autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED
		});
	}

	window['__onGCastApiAvailable'] = isAvailable => {
		if (isAvailable) { 
			initializeCastApi();
			console.log('Cast: initialized.');
		}
	}
}

// Controls
export const player = new cast.framework.RemotePlayer();
export const playerController = new cast.framework.RemotePlayerController(player);

// Media
const mediaInfo = (currentMediaURL, contentType) => {
	return new chrome.cast.media.MediaInfo(currentMediaURL, contentType);
}

const request = (trackURL, type) => {
	return new chrome.cast.media.LoadRequest( mediaInfo(trackURL, type) );
}

export const loadMedia = (url, type, audio) => {
	let req = request(url, type);
	getCastSession().loadMedia(req).then(
		() => { 
			console.log('Cast: media loaded.');
			playerController.seek();
			audio.play();
		},
		errorCode => { console.log('Cast: error code: ' + errorCode); }
	);
}

const stopCasting = () => {
	getCastSession().endSession(true);
}

// const eventTypesRef = { 
// 	ANY_CHANGE: "anyChanged",
// 	CAN_PAUSE_CHANGED: "canPauseChanged",
// 	CAN_SEEK_CHANGED: "canSeekChanged",
// 	CURRENT_TIME_CHANGED: "currentTimeChanged",
// 	DISPLAY_NAME_CHANGED: "displayNameChanged",
// 	DISPLAY_STATUS_CHANGED: "displayStatusChanged",
// 	DURATION_CHANGED: "durationChanged",
// 	IMAGE_URL_CHANGED: "imageUrlChanged",
// 	IS_CONNECTED_CHANGED: "isConnectedChanged",
// 	IS_MEDIA_LOADED_CHANGED: "isMediaLoadedChanged",
// 	IS_MUTED_CHANGED: "isMutedChanged",
// 	IS_PAUSED_CHANGED: "isPausedChanged",
// 	MEDIA_INFO_CHANGED: "mediaInfoChanged",
// 	PLAYER_STATE_CHANGED: "playerStateChanged",
// 	STATUS_TEXT_CHANGED: "statusTextChanged",
// 	TITLE_CHANGED: "titleChanged",
// 	VOLUME_LEVEL_CHANGED: "volumeLevelChanged" 
// }