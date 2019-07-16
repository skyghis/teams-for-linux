const { remote } = require('electron');
const { BrowserWindow } = remote;

function selectSource(callback) {
	alert('selectSource');
	var display  = remote.screen.getPrimaryDisplay();
	const selectorWindow = new BrowserWindow({
		title: 'Share Your Screen',
		parent: remote.getCurrentWindow(),
		autoHideMenuBar: true,
		backgroundColor: '#fff',
		width: 680,
		height: 480,
		x: display.bounds.width - 680,
		y: display.bounds.height -480
	});

	selectorWindow.webContents.once('did-finish-load', function () {
		selectorWindow.emit('pickDesktopMedia', ['screen', 'window']);
	});

	const url = require('url').format({
		protocol: 'file',
		slashes: true,
		pathname: require('path').join(__dirname, 'captureSelector.html')
	});

	selectorWindow.on('close', () => callback());
	selectorWindow.on('chooseDesktopMedia', callback);
	selectorWindow.loadURL(url);
}

module.exports = { selectSource };