const express = require('express');
const multer = require('multer')
const hbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: './public/image/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('myimage')

const app = express()

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static(__dirname+'./public'))


app.get('/', (req, res)=> res.render('index'))

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {msg:err})
        }
        else {
            // let fileName = []

            // fs.readdirSync
            res.render('image')
        }
    })
})

// app.post('/upload', (req,res) => {
//     let data = req.body;
//     // path of uploaded file.
//     data.propic = '/public/image/'+req.files.fieldname;
//     res.render('image',{
//        "data": data
//     });
// });

app.listen(3010, ()=> {
    console.log('server is running on port 3010')
})