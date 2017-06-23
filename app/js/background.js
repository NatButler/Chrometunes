/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */
const initData = (win, data) => {
	win.contentWindow.launchData = launchData
}

const launch = data => {
	chrome.app.window.create('window.html', {
		id: 'appWin',
    outerBounds: {
      'width': screen.width,
      'height': screen.height
    }
  });
}

chrome.app.runtime.onLaunched.addListener(launch);


chrome.app.runtime.onRestarted.addListener( () => {
	chrome.storage.local.get('iTunesXML', file => {
		console.info('Checking storage.');
		if (file.iTunesXML) {
			chrome.fileSystem.isRestorable(file.iTunesXML, bIsRestorable => {
        // the entry is still there, load the content
        console.info("Restoring " + file.iTunesXML);
        chrome.fileSystem.restoreEntry(file.iTunesXML, iTunesXML => {
        	console.log(iTunesXML);
          if (iTunesXML) {
            iTunesXML.isFile ? console.log(iTunesXML) : false;
          }
        });
      });
		}
	});
});


chrome.app.runtime.onSuspend.addListener( () => {
	console.log('Stop casting.');
	stopCasting();
});