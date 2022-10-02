const express = require('express')
const expressLayout = require('express-ejs-layouts')
const multer = require('multer')
require('./utils/db')
const collection = require('./utils/collection')

const port = 3000
const app = express()
const imgPath = './public/img'

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, imgPath)
    },
    filename : function(req, file, cb) {
        const nameUnique = Date.now() + '-' + 'unique'
        cb(null, file.fieldname + '-'+ nameUnique + '.jpg')
    }
})

const img = multer({storage : storage})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(expressLayout)

app.get('/', async(req,res) => {
    const data = await collection.find()
    console.log(data)
    res.render('home', {data : data, layout : 'layouts/layout'})
})

app.get('/collection', (req,res) => {
    res.render('collection', {layout : 'layouts/layout'})
})

app.post('/collection', img.single('pict') ,(req,res) => {
    const imagePath = imgPath.replace('./public/', '')
    const Collection = collection.insertMany({
        name : req.body.name,
        author : req.body.author,
        supply : req.body.supply,
        imgfile : req.file.filename,
        imgpath : imagePath
    })
    res.redirect('/')
})

app.use((req,res) => {
    res.send('404')
})
app.listen(port, (req,res)=>{
    console.log('listening')
})
