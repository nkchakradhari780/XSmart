import express from 'express'
const router = express.Router();

import categoryRoute from './categoryRoute.js'
import productRoute from './productsRoute.js'
import tagRoute from './tagRoute.js'
import materialRoute from './materialRoute.js'
import projectRoute from './projectRoute.js'

router.get('/', (req, res) => {
  res.json({ message: "Index Route working!" });
});

router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/tag', tagRoute);
router.use('/material', materialRoute);
router.use('/project', projectRoute);

export default router;