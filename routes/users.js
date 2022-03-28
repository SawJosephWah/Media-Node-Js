var router = require('express').Router();

let controller = require('../controller/user');


router.post("/",controller.login);
router.post("/register",controller.register);


module.exports = router;