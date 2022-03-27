const DB = require('../dbs/user')
const helper = require('../utils/helper')

let all = async (req, res) => {
  let users = await DB.find();
  helper.fMsg(res,true,'All Users',users);
  
  }

let add =async  (req, res) =>{
  let user = new DB(req.body);
  let newUser  = await user.save();
  helper.fMsg(res,true,'New User Added',newUser);
};

let get =async  (req, res) => {
  let user = await DB.findById(req.params.id);
  helper.fMsg(res,true,'User By Id',user);
  };

let update =async  (req,res,next)=> {
  const rule = /[a-zA-Z0-9]{24}/;
  let test = rule.test(req.params.id);
  if(!test){
    next(new Error('Error : Invalid params'));
  }

  let user = await DB.findById(req.params.id);

  if(user){
    await DB.findByIdAndUpdate(user._id,req.body);
    let updatedUser = await DB.findById(user._id);
    helper.fMsg(res,true,'Updated User',updatedUser);
  }else{
    next(new Error('Error : There is no user'));
  }
  };

let drop = async (req,res)=> {
    await DB.findByIdAndDelete(req.params.id);
    helper.fMsg(res,true,'Deleted User');
  };

  module.exports = {
      all,
      add,
      get,
      update,
      drop
  }