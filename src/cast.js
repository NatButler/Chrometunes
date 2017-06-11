// Initialize
export const castInit = () => {
	const initializeCastApi = () => {
		cast.framework.CastContext.getInstance().setOptions({
			receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
			autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED
		});
	}

	window['__onGCastApiAvailable'] = isAvailable => {
		if (isAvailable) { 
			console.log('Init cast.');
			initializeCastApi();
		}
	}
}

// Media
const mediaInfo = (currentMediaURL, contentType) => {
	return new chrome.cast.media.MediaInfo(currentMediaURL, contentType);
}

const request = (trackURL, type) => {
	return new chrome.cast.media.LoadRequest( mediaInfo(trackURL, type) );
}

const getCastSession = () => {
	return cast.framework.CastContext.getInstance().getCurrentSession();
}

export const loadMedia = (url, type) => {
	let req = request(url, type);

	getCastSession().loadMedia(req).then(
		() => { console.log('Load succeed: ', player.mediaInfo); },
		errorCode => { console.log('Error code: ' + errorCode); }
	);
}

// Controls
export const player = new cast.framework.RemotePlayer();
export const playerController = new cast.framework.RemotePlayerController(player);

playerController.addEventListener(
	cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, () => {
		// store.dispatch( setCastStatus(player.isConnected) );
		console.log('Connected:', player.isConnected);
	}
);

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

const stopCasting = () => {
	getCurrentSession().endSession(true);
	// End the session and pass 'true' to indicate
	// that receiver application should be stopped.
}