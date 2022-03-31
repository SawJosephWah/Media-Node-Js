let DB = require('../dbs/post');

let Helper = require('../utils/helper')

let all = async (req, res) => {

    let posts = await DB.find().populate('user cat','-password -__v');
    Helper.fMsg(res,true,'All Posts',posts);
  }

let add =async  (req, res) =>{

  let userId = req.body.user._id;

  let post =await new DB(req.body).save();
  Helper.fMsg(res,true,'Post added',post);
};

let get =async  (req, res , next) => {
    let post = await DB.findById(req.params.id).populate('user cat','-password -__v');

    if(post){
      Helper.fMsg(res,true,'Get Post',post);
    }else{
     next(new Error('Error , post not found with that ID'));
    }
    
  };

let update =async  (req,res,next)=> {
    
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndUpdate(post._id , req.body);
        let updatedPost = await DB.findById(post._id);
        Helper.fMsg(res,true,'Updated post',updatedPost);
    }else{
        next(new Error('Category with that ID not found'));
        return;
    }
  };

let drop = async (req,res)=> {
  let post = await DB.findById(req.params.id );
  if(post){
      gallery.deleteFile(post.image);
      await DB.findByIdAndRemove(post._id);
      
      Helper.fMsg(res,true,'Post category', [] );
  }else{
      next(new Error('Post with that ID not found'));
      return;
  }
  };

let bycat = async (req, res,next) => {
    let post = await DB.find({cat:req.params.id}).populate('user cat','-password -__v');

    if(post){
      Helper.fMsg(res,true,'Get Post',post);
    }else{
     next(new Error('Error , post not found with that category ID'));
    }
  }

let byuser =async  (req,res,next) => {
    let post = await DB.find({user:req.params.id}).populate('user cat','-password -__v');
  
      if(post){
        Helper.fMsg(res,true,'Get Post',post);
      }else{
       next(new Error('Error , post not found with that user ID'));
      }
  }


  module.exports = {
      all,
      add,
      get,
      update,
      drop,
      bycat,
      byuser
  }