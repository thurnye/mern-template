const Controller = require('../Controller/controller');
const router = require('express').Router()

//SignUp
router.post('/user', Controller.postUser);

// Login
router.post('/user/login', Controller.getLogIn);

//get all users
router.get('/user', Controller.getAllUsers)

//getting a user item by id
router.get('/user/:id', Controller.getAUserByID);
 

//post delete
router.post('/user/:id', Controller.postDeleteUser);




module.exports = router;