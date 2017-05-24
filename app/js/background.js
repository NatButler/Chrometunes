chrome.app.runtime.onLaunched.addListener( () => {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': screen.width,
      'height': screen.height
    }
  });
});

chrome.runtime.onSuspend.addListener( () => {
	console.log('Stop casting.');
	stopCasting();
});