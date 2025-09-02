import express from 'express'
const router = express.Router();

import categoryRoute from './categoryRoute.js'
import productRoute from './productsRoute.js'

router.get('/', (req, res) => {
  res.json({ message: "Index Route working!" });
});

router.use('/category', categoryRoute);
router.use('/product', productRoute);

export default router;