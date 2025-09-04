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
dotenv.config();

if (process.env.NODE_ENV === "development") {
    router.use("/admins", adminRoutes);
  console.log("⚡ Admin routes enabled (development only)");
} else {
    console.log("🚫 Admin routes disabled in production");
}
router.use('/',loginRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/tag', tagRoute);
router.use('/material', materialRoute);
router.use('/project', projectRoute);


export default router;