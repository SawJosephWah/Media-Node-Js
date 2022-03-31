const Joi = require('joi');


module.exports = {
    schema : {
        catVal : Joi.object({
            name: Joi.string()
            .required(),

            image: Joi.string()
            .required(),
        })
        ,
        validateParam : {
            id : Joi.object({
                id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            })
        } ,
        UserRegister : Joi.object({
            name : Joi.string().required(),
            email: Joi.string().email().required(),
            password : Joi.string().required().min(8).max(25),
            phone : Joi.string().required().min(8).max(11)      
        }),
        PostAdd : Joi.object({
            cat : Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required(),
            image:Joi.string().required(),
            desc : Joi.string().required(),
            user : Joi.optional()   
        })
        
    }

}