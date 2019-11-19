const express = require('express');

const controller = require('../../controllers/categories/category.controller.api');
const router = express.Router();

router.use(express.static('public'));

// Query data from DB
router.get('/', controller.index);

// Query 1 category from DB
router.get('/:id', controller.show);

// Insert data into DB
router.post('/', controller.create);

// Update data into DB
router.put('/:id', controller.update);

// Delete data from DB
router.delete('/:id', controller.delete);
module.exports = router;