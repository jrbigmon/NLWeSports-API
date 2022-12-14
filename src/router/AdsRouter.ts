//express
import express from 'express'   
const router = express.Router()

//controller
import AdsController from '../controller/AdsController'

// routes
router.get('/ads', AdsController.getAds)
router.get('/games/:id/ads', AdsController.getAdsByGameId)
router.post('/ads', AdsController.adCreate)

export default router