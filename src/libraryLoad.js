import parseXML from './parseXML';

export const loadLibrary = () => {
	return new Promise( (resolve, reject) => {
		let library;
		
		chrome.fileSystem.chooseEntry({ type: 'openDirectory' }, directory => {
			if (!directory) { return resolve(undefined); }// reject('No directory chosen.'); }

			directory.createReader().readEntries(results => {
				let iTunesLib;
				let mediaDir;
				let libDir;

				results.forEach(res => {
					if (res.isFile && res.name === 'iTunes Library.xml') iTunesLib = res;
					if (res.isDirectory && res.name === 'iTunes Media') mediaDir = res;
				});

				if (!iTunesLib || !mediaDir) {
					reject('Cannot find "iTunes Library.xml" or "iTunes Media" directory.')
				}

				chrome.fileSystem.getDisplayPath(iTunesLib, path => { libDir = path; });

				iTunesLib.file(xml => {
					let reader = new FileReader();
					// reader.onerror = errorHandler;
					reader.onload = e => {
						console.time('parseXML');
						library = parseXML( convertXMLString(e.target.result), libDir );
						console.timeEnd('parseXML');
						library.then(lib => { return resolve(lib); }).catch(reason => { console.error(reason); });
					}

					reader.readAsText(xml);
				});

			});
		});
	});
}

const convertXMLString = xml => {
	if (typeof window.DOMParser != 'undefined') {
		return ( new window.DOMParser() ).parseFromString(xml, 'text/xml');
	} else {
		throw new Error('No XML parser found');
	}
}