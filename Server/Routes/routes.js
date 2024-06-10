const userController = require('../Controller/userController');
const router = require('express').Router()

//SignUp
router.post('/user', userController.postUser);

// Login
router.post('/user/login', userController.getLogIn);

//get all users
router.get('/user', userController.getAllUsers)

//getting a user item by id
router.get('/user/:id', userController.getAUserByID);
 

//post delete
router.post('/user/:id', userController.postDeleteUser);


module.exports = router;