const DB = require('../dbs/comment');

let Helper = require('../utils/helper');

let commentByPost = async (req,res,next) => {
    let postId = req.params.id;
    let comments = await DB.find({postId});
    
    Helper.fMsg(res,true,"All comments for unique post" ,comments);
    
}

let add = async (req, res, next) => {

    let newComment = await new DB(req.body).save();
    Helper.fMsg(res,true,'New Comment Created',newComment);
}

let drop = async (req, res, next) => {
    let comment = await DB.findById(req.params.id );
    if(comment){
        await DB.findByIdAndRemove(comment._id);
        
        Helper.fMsg(res,true,'Deleted comment', [] );
    }else{
        next(new Error('Comment with that ID not found'));
        return;
    }
}

module.exports = {
    add,
    drop,
    commentByPost
}