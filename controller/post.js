let DB = require('../dbs/post');
let CommentDB = require('../dbs/comment')

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
    let comments = await CommentDB.find({postId:post._id});
    post=post.toObject();
    post.comments = comments;

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

let bytag =async  (req,res,next) => {
    let post = await DB.find({tag:req.params.id}).populate('user cat','-password -__v');
  
      if(post){
        Helper.fMsg(res,true,'Get Post',post);
      }else{
       next(new Error('Error , post not found with that user ID'));
      }
  }

let paginate = async (req,res,next) => {
    // console.log(req.params.page);
    let page = req.params.page;

    //for minus params
    if(page <= 0){
      page = 1;
    }
    page = page == 1 ? 0 : page - 1;

    let limit = process.env.POST_LIMIT;
    let postStartCount = page * limit;

    let posts = await DB.find().limit(limit).skip(postStartCount);

    Helper.fMsg(res,true,'Paginated Posts',posts);

}


  module.exports = {
      all,
      add,
      get,
      update,
      drop,
      bycat,
      byuser,
      bytag,
      paginate
  }