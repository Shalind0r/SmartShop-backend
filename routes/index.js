const Router = require('express');
const userRouter = require('./userRouter');
const productRoute = require('./productRoute');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const catalogRoute = require('./catalogRoute');
const filtersRoute = require('./filtersRoute');

const router = new Router();
router.use('/catalog', catalogRoute);
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRoute);
router.use('/filters', filtersRoute);

module.exports = router;
