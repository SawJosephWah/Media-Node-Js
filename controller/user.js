const DB = require('../dbs/user')
const helper = require('../utils/helper')

let register = async (req,res,next) => {

  let checkName = await DB.findOne({name : req.body.name});
  if(checkName){
    next(new Error('Name is already taken'));
    return ;
  }
  

  let checkEmail =await DB.findOne({email : req.body.email});
  if(checkEmail){
    next(new Error('Email is already taken'));
    return ;
  }

  let checkPhone =await DB.findOne({phone : req.body.phone});
  if(checkPhone){
    next(new Error('Phone is already taken'));
    return ;
  }

  let hash_password = helper.encodePassword(req.body.password);
  req.body.password = hash_password;
  let new_user = await new DB(req.body).save();
  helper.fMsg(res,true,'New user added',new_user);
  }

let login = async (req, res,next) => {    
    // helper.fMsg(res,true,'Login',req.body);  
    let checkPhone =await DB.findOne({phone : req.body.phone});
    if(!checkPhone){
      next(new Error('Crednetial Error : Wrong Phone'));
      return ;
    }

    let checkPassword = helper.decodePassword(req.body.password,checkPhone.password);
    if(!checkPassword){
      next(new Error('Crednetial Error : Wrong Password'));
      return ;
    }

   
    let user = checkPhone.toObject();
    user.token = helper.createToken(user);
    delete user.password;

    helper.fMsg(res,true,`Successfuly Login ${checkPhone.name}`,user);


}


  module.exports = {
    register,
    login
  }