
let router  = require('express').Router();
let controller = require('../controller/comment');
let {validator,validateParamId,validateToken} = require('../utils/validator');
let {schema} = require('../utils/schema');




router.post("/" , validateToken , validator(schema.CommentAdd),controller.add);

router.route('/:id')
.delete(validateToken,validateParamId(schema.validateParam.id ) , controller.drop );

router.get('/commentsByPost/:id',validateParamId(schema.validateParam.id ),controller.commentByPost);


module.exports = router;