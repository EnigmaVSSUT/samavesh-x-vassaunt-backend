const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/signup', userController.postSignUp);
router.post('/login', userController.postLogin);
router.post('/addEvent', userController.postAddEvent);
router.delete('/deleteEvent', userController.postDeleteEvent);

module.exports = router;