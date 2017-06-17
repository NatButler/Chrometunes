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


chrome.runtime.onRestarted.addListener( () => {
	chrome.fileSystem.restoreEntry('iTunesXML', fileEntry => {
		console.log(fileEntry);
	});
});


chrome.runtime.onSuspend.addListener( () => {
	console.log('Stop casting.');
	stopCasting();
});

