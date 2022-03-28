// const Helper = require('../utils/helper')

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
    }
}