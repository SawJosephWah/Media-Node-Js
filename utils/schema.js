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
        } 
        
    }

}