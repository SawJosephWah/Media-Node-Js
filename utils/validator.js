// const Helper = require('../utils/helper')
var jwt = require('jsonwebtoken');

const DB  = require("../dbs/user");

module.exports = {
    validator : (schema)=>{
        return (req,res,next) => {
            
            const validate = schema.validate(req.body);
            if(validate.error){
                next(new Error(validate.error.details[0].message))
            }else{
                next();
            }
        }
        
    },
    validateParamId : (schema) => {
        return (req ,res, next) => {
            let validate = schema.validate({id:req.params.id})
            if(validate.error){
                next(new Error(validate.error.details[0].message)) 
            }else{
                next();
            }
        }
    },
    validateToken : async (req,res,next) => {
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let decoded = jwt.decode(token,process.env.SECRET_KEY)

            let user = await DB.findById(decoded._id);
            if(user){
                req.body['user'] = user;
                next();
            }else{
                next(new Error('Tokenization Error'));
            }
            
        }else{
            next(new Error('Tokenization Error'));
        }
    }
}