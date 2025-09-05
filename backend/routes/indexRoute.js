import express from 'express'
const router = express.Router();

import categoryRoute from './categoryRoute.js'
import productRoute from './productsRoute.js'
import tagRoute from './tagRoute.js'
import materialRoute from './materialRoute.js'
import projectRoute from './projectRoute.js'
import adminRoutes from './adminRoute.js'
import loginRoute from './loginRoute.js'
import dotenv from 'dotenv'
import { verifyAdmin } from '../middlewares/authAdmin.js';
dotenv.config();

router.use("/admins", verifyAdmin, adminRoutes);
router.use('/',loginRoute);
router.use('/category',verifyAdmin, categoryRoute);
router.use('/product', productRoute);
router.use('/tag', verifyAdmin, tagRoute);
router.use('/material', verifyAdmin, materialRoute);
router.use('/project',projectRoute);


export default router;