require('dotenv').config()
const express = require('express')
const app = express()
const moment = require('moment')
const parseApk = require('./utils/parseApk')
const fileUpload = require('express-fileupload');
const initDB = require('./boot/initDB')
const conf = require('./utils/conf')
const fileStore = require('./utils/fileStorage')
const cors = require('cors')

initDB().then(() => conf.setBasePath(__dirname) )

app.use(fileUpload());
app.use(cors())
app.use(express.static('uploads'))

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.file;
    const filePath = `apk/${moment().format('YYYY-MM-DD')}/${Date.now()}-${file.name}`
    await fileStore.put(filePath, file.data)
    const packageInfo = await parseApk(await fileStore.path(filePath))
    const DB = await initDB()
    const packInfo = {...packageInfo, path: filePath}
    const storeData = await DB.cases.add(packInfo)
    const {path, icon, iconPath, ...other} = packInfo
    res.send({
        id: storeData.id,
        ...other,
        iconUrl: fileStore.url(packInfo.iconPath),
        iconFileId: packInfo.iconFileId
    })
})


app.post('/uploadIcons', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.file;
    const filePath = `icons/${moment().format('YYYY-MM-DD')}/${Date.now()}-${file.name}`
    await fileStore.put(filePath, file.data)
    const DB  = await initDB()
    const {dataValues: {id}} = await DB.files.create({path: filePath})
    res.status(201).send({
        id,
        status: "done",
        url: fileStore.url(filePath)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`
        Server is running!
        Listening on http://127.0.0.1:${process.env.PORT}
        Explore at https://wuchuheng.com
    `)
})
