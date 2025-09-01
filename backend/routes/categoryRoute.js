import express from 'express'
import { addCategory } from '../controllers/categoriesControllers.js'

const router = express.Router()

router.post('/',addCategory);

export default router;
