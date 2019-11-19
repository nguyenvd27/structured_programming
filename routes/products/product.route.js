const express = require('express');

const controller = require('../../controllers/products/product.controller');
const router = express.Router();

router.use(express.static('public'));

router.use('/static', express.static('public'));

// Query data from DB, show full products
router.get('/', controller.index);

// trang tao moi san pham
router.get('/new', controller.new);

// create product
router.post('/', controller.create);

// show product detail
router.get('/:id', controller.show);

// trang edit product
router.get('/:id/edit', controller.edit);

// update product
router.post('/:id', controller.update);

// delete product
router.post('/delete/:id', controller.delete);

module.exports = router;