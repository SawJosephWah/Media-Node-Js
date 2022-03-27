let saveFile =async  (req,res,next)=>{
    let file = req.files.file;
    let filename = new Date().valueOf() + '_' + file.name;
    file.mv(`./uploads/${filename}`);
    req.fileUploadedName = filename;
    next();
}

let saveFiles =async  (req,res,next)=>{
    let filenames = [];
    let files = req.files.files;
    files.forEach((file)=>{
        let filename = new Date().valueOf() + '_' + file.name;
        file.mv(`./uploads/${filename}`);
        filenames.push(filename);
    })
    req.filenames = filenames;
    next();
}

module.exports = {
    saveFile,
    saveFiles
}