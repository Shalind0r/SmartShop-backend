const Router = require('express');
const userRouter = require('./userRouter');
const productRoute = require('./productRoute');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRoute);

module.exports = router;
