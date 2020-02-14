var {PythonShell} = require('python-shell');

module.exports.ClassifySpeakersSoundFile = function (deviceID, speakerDiscriminator, filesNameList){
	var options = {
		mode: 'text',
		encoding: 'utf8',
		pythonOptions: ['-u'],
		scriptPath: '',
		args: [deviceID, speakerDiscriminator, filesNameList],
		pythonPath: ''
	};
	PythonShell.run('./pythonModules/classifySpeakersVoiceFile.py', options, function (err) {
		if (err) 
			throw err;
		else
			console.log(String(speakerDiscriminator) + " is Stored Successfully!");
	});
}


module.exports.startRecognitionTraining = function (deviceID){
	var options = {
		mode: 'text',
		encoding: 'utf8',
		pythonOptions: ['-u'],
		scriptPath: '',
		args: [deviceID],
		pythonPath: ''
	};

	PythonShell.run('./pythonModules/voiceRecognitionWithSVM.py', options, function (err) {
		if (err) 
			throw err;
		else
			console.log("training Completed Successfully!");
	});
}