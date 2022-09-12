//express
import express from 'express'   
const router = express.Router()
//controller
import AdsController from '../controller/AdsController.mjs';
// routes
router.get('/ads', AdsController.getAds)

export default router