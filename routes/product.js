const express = require('express');
const router = express.Router();
const productController = require('../controller/Product');

router.get('/', productController.fetchAll);
router.post('/', productController.create);

module.exports = router;