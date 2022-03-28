const DB = require('../dbs/user')
const helper = require('../utils/helper')

let register = async (req, res) => {
  helper.fMsg(res,true,'Register',req.body);
  }

let login = async (req, res) => {    
    helper.fMsg(res,true,'Login',req.body);  
}


  module.exports = {
    register,
    login
  }