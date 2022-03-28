const DB = require('../dbs/category');

let Helper = require('../utils/helper');
let gallery = require('../utils/gallary')

let all = async (req,res,next) => {
    let cats = await DB.find();
   Helper.fMsg(res,true,'All categories',cats);
}

let add = async (req, res, next) => {

    let getName =await DB.findOne({name:req.body.name});
    if(getName){
        next(new Error('This name aready exists'));
        return;
    }
    let newCat = await new DB(req.body).save();
    Helper.fMsg(res,true,'New Category Added',newCat);
}

let get = async (req,res,next) => {
    
    let cat = await DB.findById(req.params.id );
    if(!cat){
        next(new Error('Category with that ID not found'));
        return;
    }
    Helper.fMsg(res,true,'Get category',cat);
}

let update = async (req,res,next) => {
    let cat = await DB.findById(req.params.id );
    if(cat){
        await DB.findByIdAndUpdate(cat._id , req.body);
        let updatedCat = await DB.findById(cat._id);
        Helper.fMsg(res,true,'Updated category',updatedCat);
    }else{
        next(new Error('Category with that ID not found'));
        return;
    }
    
}

let drop = async (req, res, next) => {
    let cat = await DB.findById(req.params.id );
    if(cat){
        gallery.deleteFile(cat.image);
        await DB.findByIdAndRemove(cat._id);
        
        Helper.fMsg(res,true,'Deleted category', [] );
    }else{
        next(new Error('Category with that ID not found'));
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