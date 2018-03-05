import * as fT from './constants/filterTypes';

// Make use of reduce for search / sort?
// Change structure of tracks for faster lookup: normalise data


// SEARCH
export const trkSearch = (ts, q) => ts.filter(t => matchTrk(t, q) );
const matchTrk = (t, q) => matchStr(t[fT.ARTIST], q) || matchStr(t[fT.ALBUM], q) || matchStr(t[fT.TITLE], q);
const matchStr = (a, b) => a.toLowerCase().indexOf( b.toLowerCase() ) != -1;

// FILTER
export const trkFilter = (ts, fil, tp, dsc) => {
	switch(tp) {
		case fT.ALBUM:
			return ts.filter(trk => {
				if (dsc) { return matchProp(trk, fil, tp) && matchProp(trk, fil, fT.ARTIST) && matchProp(trk, fil, fT.DISC); }
				return matchProp(trk, fil, tp) && matchProp(trk, fil, fT.ARTIST);
			}).sort(rtkNumAsc);
		default:
			return ts.filter(trk => matchPropVal(trk, fil, tp) );
	}
}

const matchProp = (a, b, p) => a[p] === b[p];
const matchPropVal = (a, b, p) => a[p] === b;

export const getArtistAlbs = (ts, fil, tp) => {
	const albs = new Set();
	const albTrks = [];
	const artistAlbs = ts.filter(trk => {
		if ( matchPropVal(trk, fil, tp) ) {
			if ( !albs.has(trk[fT.ALBUM]) ) {
				albTrks.push(trk);
				albs.add(trk[fT.ALBUM]);
			}
			return true;
		}
	});

	return [].concat(...albTrks.sort(alphAsc).map(alb => trkFilter(artistAlbs, alb, fT.ALBUM) ));
}

// SORT
export const sortLibrary = (tracks, artists, type = fT.ARTIST) => {
	const results = artists.map(artist => getArtistAlbs(tracks, artist, type));
	return [].concat(...results);
}

const rtkNumAsc = (a, b) => a.Disc - b.Disc || a.Track - b.Track;
const alphAsc = (a, b) => {
	if (a[fT.ALBUM] < b[fT.ALBUM]) return -1;
	if (a[fT.ALBUM] > b[fT.ALBUM]) return 1;
	return 0;
}