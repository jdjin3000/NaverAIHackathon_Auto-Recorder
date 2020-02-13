const express = require('express');
//const bodyParser = require('body-parser')
const multer = require('multer')
//const upload = multer({ dest: 'upload/' })
const formidable = require('formidable')
const { audioConvert } = require('./convert')
const { csr } = require('./csr');
const config = require('./config');
const fileDir = config.fileDir;
const language = config.laguage;


app = express()

app.post('./traning', async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = fileDir;
    form.keepExtensions = true;   

    await form.parse(req, async (err, fields, files) => {
        try {
            var filePath = files.audio.path.split('\\')
            var fileName = filePath[filePath.length - 1]

            outputFileName = await audioConvert.convertRecordingFile(fileName, form.uploadDir);
            outputFilePath = form.uploadDir.concat(outputFileName);

            /* 
                Write MFCC Algorithm
            */

            res.sendStatus(201);
        } catch (error) {
            console.log(error)
        }
    });

})


app.post('/voice', async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = fileDir;
    form.keepExtensions = true;

    await form.parse(req, async (err, fields, files) => {
        try {
            var filePath = files.audio.path.split('\\')
            var fileName = filePath[filePath.length - 1]

            outputFileName = await audioConvert.convertRecordingFile(fileName, form.uploadDir);
            outputFilePath = form.uploadDir.concat(outputFileName);

            /* 
                Write MFCC Algorithm
            */

            await csr.stt(language, outputFilePath, (body) => {
                console.log("RESULT: " + body);
                res.send(body)
            });
        } catch (error) {
            console.log(error)
        }
    });
})


app.listen(3000, () => {
    console.log(`Server is running on 3000`);
})

