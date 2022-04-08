const Joi = require('joi');


module.exports = {
    schema : {
        catVal : Joi.object({
            name: Joi.string()
            .required(),

            image: Joi.string()
            .required(),
            user:Joi.optional()
        })
        ,
        validateParam : {
            id : Joi.object({
                id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            }),
            paginatePage : Joi.object({
                paginatePage: Joi.number()
            }),
            likeUnlike : Joi.object({
                likeUnlike: Joi.string().regex(/^[0-1]{1}$/).required()
            }),
        } ,
        UserRegister : Joi.object({
            name : Joi.string().required(),
            email: Joi.string().email().required(),
            password : Joi.string().required().min(8).max(25),
            phone : Joi.string().required().min(8).max(11)      
        }),
        PostAdd : Joi.object({
            cat : Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).required(),
            tag : Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required(),
            image:Joi.string().required(),
            desc : Joi.string().required(),
            user : Joi.optional()   
        }),
        TagAdd : Joi.object({
            name: Joi.string().required(),
            image: Joi.string().required(), 
            user:Joi.optional()
        }),
        CommentAdd : Joi.object({
            postId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name : Joi.string().required(),
            email:Joi.string().required(),
            context : Joi.string().required(),
            user : Joi.optional()   
        }),
        
    }

}