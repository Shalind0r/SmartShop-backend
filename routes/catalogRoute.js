const Router = require('express');
const catalogController = require('../controllers/catalogController');

const router = new Router();

router.get('/', catalogController.getAll);

module.exports = router;
