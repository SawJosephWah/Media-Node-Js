require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload');
const {saveFile , saveFiles} = require('./utils/gallary');

//mongo DB connect
mongoose.connect('mongodb://127.0.0.1:27017/Shopy');

//params
app.use(express.json());

app.use(fileUpload());

//route spitting
var users = require('./routes/users');
var posts = require('./routes/posts');



app.post('/file', saveFiles , (req,res,next)=>{
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

app.use('/users', users);
app.use('/posts', posts);

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