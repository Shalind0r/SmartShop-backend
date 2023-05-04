const Router = require('express');
const filtersController = require('../controllers/filtersController');

const router = new Router();
router.get('/', filtersController.getAll);

module.exports = router;
