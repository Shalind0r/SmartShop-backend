const Router = require('express');
const catalogController = require('../controllers/catalogController');

const router = new Router();

router.get('/', catalogController.getAllCategories);
router.get('/:id', catalogController.getCategory);

module.exports = router;
