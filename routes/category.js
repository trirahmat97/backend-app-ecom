const express = require('express');
const router = express.Router();
const categoryController = require('../controller/Category');

router.get('/', categoryController.getCategory);
router.post('/', categoryController.createCategory);
router.patch('/', categoryController.editCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;