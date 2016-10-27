import { lib } from './library';

const initState = (store) => {
	store.dispatch({
		type: 'IMPORT_LIB',
		id: lib.id,
		genres: lib.genres,
		tracks: lib.tracks
	});

	store.dispatch({
		type: 'SAVE_LIST',
		name: 'List 01',
		tracks: [{"PId":"5920471359B6EF16","Name":"Pumpkin","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":1,"TrackCount":7,"DiscCount":1,"Duration":"5:26","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/01%20Pumpkin.mp3"},{"PId":"CDB797B8B231E1BC","Name":"Subterfuge","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":2,"TrackCount":7,"DiscCount":1,"Duration":"8:05","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/02%20Subterfuge.mp3"},{"PId":"A8F02854930E377D","Name":"Black Fire","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":3,"TrackCount":7,"DiscCount":1,"Duration":"6:58","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/03%20Black%20Fire.mp3"},{"PId":"06762773BBC3D83B","Name":"Cantarnos","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":4,"TrackCount":7,"DiscCount":1,"Duration":"5:44","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/04%20Cantarnos.mp3"},{"PId":"9058158DC018F3A4","Name":"Tired Trade","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":5,"TrackCount":7,"DiscCount":1,"Duration":"5:53","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/05%20Tired%20Trade.mp3"},{"PId":"0C64980ABC09BA2B","Name":"McNeil Island","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":6,"TrackCount":7,"DiscCount":1,"Duration":"3:00","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/06%20McNeil%20Island.mp3"},{"PId":"2475A11AD5D4C620","Name":"Land Of Nod","Artist":"Andrew Hill","Album":"Black Fire","TrackNum":7,"TrackCount":7,"DiscCount":1,"Duration":"5:49","Genre":"Jazz","Kind":"mpeg","Location":"file:///Volumes/MEDIA/Music/iTunes%20library/iTunes%20Media/Music/Andrew%20Hill/Black%20Fire/07%20Land%20Of%20Nod.mp3"}]
	});
}

export default initState