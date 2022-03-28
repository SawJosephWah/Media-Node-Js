require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload');
const {saveFile , saveFiles , deleteFile} = require('./utils/gallary');
const path = require('path');

//mongo DB connect
mongoose.connect('mongodb://127.0.0.1:27017/Shopy');


app.use(express.json());        //for req body

app.use(fileUpload());

app.use('/uploads',express.static(path.join(__dirname,'uploads')))  //for serve static 

//route spitting
let users = require('./routes/users');
let posts = require('./routes/posts');
let category = require('./routes/category');




app.post('/file', saveFile , (req,res,next)=>{
    res.json({
        msg : 'File Uploaded',
        filenames : req.fileUploadedName
    })
});

app.post('/multi_file', saveFiles , (req,res,next)=>{
    res.json({
        msg : 'File Uploaded',
        filenames : req.filenames
    })
});

app.post('/delete_file' , async (req, res , next) => {
    await deleteFile(req.body.filename);
    res.json({
        msg : 'File Deleted',
    })
})

app.use('/users', users);
app.use('/posts', posts);
app.use('/cat',category);

//for error message
app.use((err, req, res, next) => {
    err.status = err.status || 200;

    res.status(err.status).json({
        con:false,
        msg : err.message
    })
  })

  
app.listen(process.env.PORT,()=>{
    console.log(`Web App Running on post ${process.env.PORT} and DB is ${process.env.DB_NAME}`);
})