const DB = require('../dbs/tag');

let Helper = require('../utils/helper');
let gallery = require('../utils/gallary');

let all = async (req,res,next) => {
    let tags = await DB.find();
   Helper.fMsg(res,true,'All tags',tags);
}

let add = async (req, res, next) => {

    let getName =await DB.findOne({name:req.body.name});
    if(getName){
        next(new Error('This tag name aready exists'));
        return;
    }
    let newTag = await new DB(req.body).save();
    Helper.fMsg(res,true,'New Tag Created',newTag);
}

let get = async (req,res,next) => {
    
    let tag = await DB.findById(req.params.id );
    if(!tag){
        next(new Error('Tag with that ID not found'));
        return;
    }
    Helper.fMsg(res,true,'Get tag',tag);
}

let update = async (req,res,next) => {
    let tag = await DB.findById(req.params.id);
    if(tag){
        await DB.findByIdAndUpdate(tag._id , req.body);
        let updatedtag = await DB.findById(tag._id);
        Helper.fMsg(res,true,'Updated tag',updatedtag);
    }else{
        next(new Error('Tag with that ID not found'));
        return;
    }
    
}

let drop = async (req, res, next) => {
    let tag = await DB.findById(req.params.id );
    if(tag){
        gallery.deleteFile(tag.image);
        await DB.findByIdAndRemove(tag._id);
        
        Helper.fMsg(res,true,'Deleted tag', [] );
    }else{
        next(new Error('Tag with that ID not found'));
        return;
    }
}

module.exports = {
    all,
    add,
    get,
    update,
    drop
}