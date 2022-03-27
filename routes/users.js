var router = require('express').Router();

let controller = require('../controller/user');


  //get all users
router.get("/",controller.all);



  //add post
router.post('/', controller.add);


router.route('/:id')
.get(controller.get)
.patch(controller.update)
.delete(controller.drop);


module.exports = router;