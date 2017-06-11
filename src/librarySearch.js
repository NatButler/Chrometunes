import * as filterType from './constants/filterTypes';

// SEARCH
export const trkSearch = (tracks, query) => {
	return tracks.filter(trk => {
		return matchTrack(query, trk);
	});
}

const matchTrack = (query, trk) => {
	return (stringMatch(trk[filterType.ARTIST], query) || stringMatch(trk[filterType.ALBUM], query) || stringMatch(trk[filterType.TITLE], query) );
}

const stringMatch = (a, b) => {
	return ( a.toLowerCase().indexOf(b.toLowerCase() ) != -1);
}

// FILTER
export const trkFilter = (
	tracks,
	filter,
	type,
	disc
) => {
	switch(type) {
		case filterType.ALBUM:
			return tracks.filter(trk => {
				if (disc) {
					return matchFilter(trk, type, filter) && matchFilter(trk, filterType.ARTIST, filter) && matchFilter(trk, filterType.DISC, filter);	
				}
				return matchFilter(trk, type, filter) && matchFilter(trk, filterType.ARTIST, filter);
			}).sort(sortTrkNum);
		default:
			return tracks.filter(trk => {
				return trk[type] === filter;
			});
	}
}

const matchFilter = (trk, type, filter) => {
	return trk[type] === filter[type];
}

// SORT
export const sortTrkNum = (a, b) => {
	return a.Disc - b.Disc || a.Track - b.Track;
}

const sortAlph = (a, b) => {
	if (a.Album < b.Album) return -1;
	if (a.Album > b.Album) return 1;
	return 0;
}

export const getArtistAlbums = (tracks, filter, type) => {
	const albums = new Set();
	const albumTrks = [];
	const artistAlbums = tracks.filter(trk => {
		if (trk[type] === filter) {
			if ( !albums.has(trk[filterType.ALBUM]) ) {
				albumTrks.push(trk);
				albums.add(trk[filterType.ALBUM]);
			}
			return true;
		}
	});

	const results = albumTrks.sort(sortAlph).map( alb => trkFilter(artistAlbums, alb, filterType.ALBUM) );
	return [].concat(...results);
}

export const getVisibleTracks = (tracks, artists, type = filterType.ARTIST) => {
	const results = artists.map(artist => getArtistAlbums(tracks, artist, type));
	return [].concat(...results);
}

// const sortByArtist = (tracks) => {

// }

// Sort not working accurately across multiple columns
// export const sortByArtist = results => {
// 	const compare = (a, b) => {
// 		let artistA = a.Artist.toLowerCase();
// 		let artistB = b.Artist.toLowerCase();
// 		let albumA = a.Album.toLowerCase();
// 		let albumB = b.Album.toLowerCase();
// 		if (artistA === artistB) {
// 			if (albumA === albumB) {
// 				return a.Track - b.Track;
// 			} else {
// 				return albumA - albumB;
// 			}
// 		} else {
// 			return artistA - artistB;
// 		}
// 		// return (x < y) ? -1 : (x > y) ? 1 : 0;
// 	}
// 	return results.sort(compare);
// }