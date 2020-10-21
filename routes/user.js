const express = require('express');
const router = express.Router();
const userController = require('../controller/User');

router.get('/', userController.fetchAll);
router.post('/', userController.createUser);
router.patch('/', userController.editUser);
router.post('/login', userController.login);

module.exports = router;