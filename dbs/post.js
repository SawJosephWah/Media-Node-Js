const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user:  {type:Schema.Types.ObjectId, required : true , ref:'User'},
    title : {type:String, required : true },
    desc : {type:String, required : true },
    create : {type:Date, default:Date.now }, 
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;