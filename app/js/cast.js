// Load media
let castSession = null;

const initializeCastApi = () => {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED
  });
}

window['__onGCastApiAvailable'] = isAvailable => {
	console.log('Init cast.');
  if (isAvailable) { 
  	initializeCastApi();
  }
}

// Controls
let player = new cast.framework.RemotePlayer();
let playerController = new cast.framework.RemotePlayerController(player);

// Media
const mediaInfo = (currentMediaURL, contentType) => {
	return new chrome.cast.media.MediaInfo(currentMediaURL, contentType);
}

const request = (trackURL, type) => {
	return new chrome.cast.media.LoadRequest( mediaInfo(trackURL, type) );
}

const getCastSession = () => {
	return castSession = cast.framework.CastContext.getInstance().getCurrentSession();
}

const loadMedia = request => {
	getCastSession().loadMedia(request).then(
	  () => { console.log('Load succeed: ', player.mediaInfo); },
	  errorCode => { console.log('Error code: ' + errorCode); }
	);
}


playerController.addEventListener(
  cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED, () => {
    let newMediaInfo = player.mediaInfo;
    console.log('Connect/Disconnect: ', player);
  }
);

const eventTypesRef = { 
	ANY_CHANGE: "anyChanged",
	CAN_PAUSE_CHANGED: "canPauseChanged",
	CAN_SEEK_CHANGED: "canSeekChanged",
	CURRENT_TIME_CHANGED: "currentTimeChanged",
	DISPLAY_NAME_CHANGED: "displayNameChanged",
	DISPLAY_STATUS_CHANGED: "displayStatusChanged",
	DURATION_CHANGED: "durationChanged",
	IMAGE_URL_CHANGED: "imageUrlChanged",
	IS_CONNECTED_CHANGED: "isConnectedChanged",
	IS_MEDIA_LOADED_CHANGED: "isMediaLoadedChanged",
	IS_MUTED_CHANGED: "isMutedChanged",
	IS_PAUSED_CHANGED: "isPausedChanged",
	MEDIA_INFO_CHANGED: "mediaInfoChanged",
	PLAYER_STATE_CHANGED: "playerStateChanged",
	STATUS_TEXT_CHANGED: "statusTextChanged",
	TITLE_CHANGED: "titleChanged",
	VOLUME_LEVEL_CHANGED: "volumeLevelChanged" 
}

const stopCasting = () => {
  let castSession = cast.framework.CastContext.getInstance().getCurrentSession();
  // End the session and pass 'true' to indicate
  // that receiver application should be stopped.
  castSession.endSession(true);
}