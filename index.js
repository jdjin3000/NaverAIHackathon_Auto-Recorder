const express = require('express');
//const bodyParser = require('body-parser')
const multer = require('multer')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
//const upload = multer({ dest: 'upload/' })
const formidable = require('formidable')
const { audioConvert } = require('./convert')
const { csr } = require('./csr');
const config = require('./config');
const voiceRecognitor = require('./pythonModules/voiceRecognition');
const fileDir = config.fileDir;
const language = config.laguage;
const users = {};
const temp = [];


app = express()
app.use(session({  // 2
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.post('/training', async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = fileDir;
    form.keepExtensions = true;
    var sessionId = req.session.id;

    await form.parse(req, async (err, fields, files) => {
        try {
            var filePath = files.audio.path.split('\\')
            var fileName = filePath[filePath.length - 1]

            outputFileName = await audioConvert.convertRecordingFile(fileName, form.uploadDir);
            outputFilePath = form.uploadDir.concat(outputFileName);
            
            var foo = fields;
            
            foo.path = outputFilePath;
            console.log('foo: ' + foo);
            temp.push(foo);
            console.log('temp: ' + temp);
            if ((fields['isFinish'] === 'true')) {
                users[sessionId] = await temp;
                async () => {
                    for (let i = 0; i < temp.length; i++) {
                        await temp.pop();
                    }
                }
                users[sessionId].forEach((i)=> {
                    console.log("반복문: " + i);
                    voiceRecognitor.ClassifySpeakersSoundFile(sessionId, i['userNumber'], i['path']);
                });
                console.log('트레이닝 스타트');
                voiceRecognitor.startRecognitionTraining(sessionId);
                
                console.log('트레이닝 종료');
            }

            
            
            res.send('ok');
            return;
        } catch (error) {
            console.log(error)
        }
    });
    return;

})


app.post('/voice', async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = fileDir;
    form.keepExtensions = true;
    var sessionId = req.session.id;
    await form.parse(req, async (err, fields, files) => {
        try {
            var filePath = files.audio.path.split('\\')
            var fileName = filePath[filePath.length - 1]

            outputFileName = await audioConvert.convertRecordingFile(fileName, form.uploadDir);
            outputFilePath = form.uploadDir.concat(outputFileName);




            /* 
                Write MFCC Algorithm
            */

            console.log(fields);
            await csr.stt(language, outputFilePath, (body) => {
                console.log("RESULT: " + body);
                res.send(body)
                return;
            });
            return;
        } catch (error) {
            console.log(error)
        }
    });
})


app.listen(3000, () => {
    console.log(`Server is running on 3000`);
})

