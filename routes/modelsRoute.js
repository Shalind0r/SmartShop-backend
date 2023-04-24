const Router = require('express');
const modelsController = require('../controllers/modelsController');

const router = new Router();

router.get('/:id', modelsController.getAll);

module.exports = router;
