var router = require('express').Router();
let {saveFile} = require('../utils/gallary');
let {validator,validateParamId,validateToken} = require('../utils/validator');
let {schema} = require('../utils/schema');

let controller = require('../controller/post');


  //get all post
router.get("/",controller.all);

  //add post
router.post('/', validateToken ,saveFile, validator(schema.PostAdd),controller.add);

//post by category
router.get('/byCat/:id',controller.bycat);

// post by user
router.get('/byUser/:id',controller.byuser);

//post by tag
router.get('/bytag/:id',controller.bytag);

//paginate
router.get('/paginate/:page', validateParamId(schema.validateParam.paginatePage) , controller.paginate )


router.route('/:id')
.get(controller.get)
.patch(validateToken,validateParamId(schema.validateParam.id),controller.update)
.delete(validateToken,validateParamId(schema.validateParam.id),controller.drop);


module.exports = router;