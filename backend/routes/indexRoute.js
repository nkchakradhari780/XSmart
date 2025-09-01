import express from 'express'
const router = express.Router();

import categoryRoute from './categoryRoute.js'

router.get('/', (req, res) => {
  res.json({ message: "Index Route working!" });
});

router.use('/category', categoryRoute);

export default router;