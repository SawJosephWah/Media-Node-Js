
let router  = require('express').Router();
let {saveFile} = require('../utils/gallary');
let controller = require('../controller/category');
let {validator,validateParamId} = require('../utils/validator');
let {schema} = require('../utils/schema');


router.get("/",  controller.all);

router.post("/",  saveFile , validator(schema.catVal),controller.add);

router.route('/:id')
.get(validateParamId(schema.validateParam.id),controller.get)
.patch(validateParamId(schema.validateParam.id ), controller.update)
.delete(validateParamId(schema.validateParam.id ) , controller.drop , )



module.exports = router;