var PythonShell = require('python-shell');

var options = {
  mode: 'text',
  encoding: 'utf8',
  pythonOptions: ['-u'],
  scriptPath: '',
  args: [],				//첫 인자는 DeviceID, 두번째 인자는 사람 구별자(0, 1, 2), 세번째 인자는 학습용 파일의 이름 , list.push()
  pythonPath: ''
};

var test = new PythonShell('test.py', options);
test.on('message',function(message){
  console.log(message);
})

module.exports.setArgumentsInOptionsForVoiceRecognition = function (arg1, arg2, arg3){
	var opt = options;
	opt.args.push(arg1);
	opt.args.push(arg2);
	opt.args.push(arg3);

	return opt;
}

module.exports.ClassifySpeakersSoundFile = function (customOption){
	PythonShell.run('classifySpeakersVoice.py', customOption, function (err) {
		if (err) 
			throw err;
		else
			console.log(" Completed Successfully!");
	});
}


module.exports.startRecognitionTraining = function (customOption){
	PythonShell.run('voiceRecognitionWithSVM.py', customOption, function (err) {
		if (err) 
			throw err;
		else
			console.log("training Completed Successfully!");
	});
}