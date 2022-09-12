//express
import express from 'express'   
const router = express.Router()

//controller
import AdsController from '../controller/AdsController'

// routes
router.get('/ads', AdsController.getAds)

export default router