const fs = require('fs');

let saveFile =async  (req,res,next)=>{
    if(req.files.file){
        let file = req.files.file;
        let filename = new Date().valueOf() + '_' + file.name;
        file.mv(`./uploads/${filename}`);
        req.body['image'] = filename;
        next();
    }
     
}

let saveFiles =async  (req,res,next)=>{
    let filenames = [];
    let files = req.files.files;
    files.forEach((file)=>{
        let filename = new Date().valueOf() + '_' + file.name;
        file.mv(`./uploads/${filename}`);
        filenames.push(filename);
    })
    req.body['image'] = filenames.join('-');
    next();
}

let deleteFile = async (filename)=>{
    fs.unlinkSync(`./uploads/${filename}`);
}



module.exports = {
    saveFile,
    saveFiles,
    deleteFile
}