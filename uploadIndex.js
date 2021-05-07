const express = require('express')
const app = express()
const fs = require('fs')
const moment = require('moment')
const parseApk = require('./utils/parseApk')

const fileUpload = require('express-fileupload');

app.get('/', function (req, res) {
    const file = '/Users/wuchuheng/Desktop/myProject/case/backEendGraphQL/uploads/2021-05-07/7850ce6da28e1644b9a41e2ff5032f0c.apk'
    parseApk(file).then(info => {
        console.log(info)
    })
    res.send('Hello World')
})

app.use(fileUpload());

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    const dir = __dirname + `/uploads/${moment().format("YYYY-MM-DD")}/`
    uploadPath = dir + sampleFile.name;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,  { recursive: true });
    }

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
    console.log(uploadPath)
});

app.listen(3000)
