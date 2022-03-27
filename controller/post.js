let DB = require('../dbs/post');

let Helper = require('../utils/helper')

let all = async (req, res) => {

    let posts = await DB.find().populate('user','-password');
    Helper.fMsg(res,true,'All Posts',posts);
  }

let add =async  (req, res) =>{
    let post = new DB(req.body);
    let newPost = await post.save();
    Helper.fMsg(res,true,'Added Post',newPost);
};

let get =async  (req, res , next) => {
    let post = await DB.findById(req.params.id).populate('user','-password -__v');
    // res.json(post);
    if(post){
      Helper.fMsg(res,true,'Get Post',post);
    }else{
     next(new Error('Error , post not found with that ID'));
    }
    
  };

let update =async  (req,res)=> {
    res.status(200).json({
      msg : `Update post with id ${req.params.id}`
    })
  };

let drop = async (req,res)=> {
    res.status(200).json({
      msg : `Delete post with id ${req.params.id}`
    })
  };

  module.exports = {
      all,
      add,
      get,
      update,
      drop
  }