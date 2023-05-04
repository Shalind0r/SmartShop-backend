const Router = require('express');
const productController = require('../controllers/productController');

const router = new Router();
router.get('/', productController.getAll);

module.exports = router;
