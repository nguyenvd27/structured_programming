const express = require('express');

const controller = require('../../controllers/categories/category.controller');
const router = express.Router();

router.use(express.static('public'));

router.use('/static', express.static('public'));

// Query data from DB, show full categories
router.get('/', controller.index);

// trang tao moi category
router.get('/new', controller.new);

// create category
router.post('/', controller.create);

// show category detail
router.get('/:id', controller.show);

// trang edit
router.get('/:id/edit', controller.edit);

// update
router.post('/:id', controller.update);

// delete
router.post('/delete/:id', controller.delete);

module.exports = router;