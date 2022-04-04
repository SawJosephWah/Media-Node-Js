const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user:  {type:Schema.Types.ObjectId, required : true , ref:'User'},
    cat: {type:Schema.Types.ObjectId, required : true , ref:'Cat'},
    tag: {type:Schema.Types.ObjectId, required : true , ref:'Tag'},
    like : { type:Number, default:0 },
    title : { type:String, required : true },
    image: { type:String , required:true },
    desc : { type:String, required : true },
    create : {type:Date, default:Date.now }, 
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;