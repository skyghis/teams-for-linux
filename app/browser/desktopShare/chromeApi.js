
const { selectSource } = require('./captureSelector');

window.chrome = {
	runtime: {
		connect: (event) => console.log('connect', event),
		sendMessage: (extensionId, messageName, callback) => {
			console.log(extensionId);
			alert(messageName);
			console.log(callback);
			if (messageName == 'version') {
				console.log(messageName);
				callback({ version: '1.1.0' });
			} else if (messageName == 'get-sourceId') {
				selectSource(sourceId => {
					callback({
						type: 'success',
						streamId: sourceId
					});
				});
			} else {
				callback({
					type: 'error',
					message: 'unknown event'
				});
			}
		}
	}
};

