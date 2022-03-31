var router = require('express').Router();
let {validator} = require('../utils/validator');
let {schema} = require('../utils/schema');

let controller = require('../controller/user');


router.post("/",controller.login);
router.post("/register",validator(schema.UserRegister),controller.register);


module.exports = router;