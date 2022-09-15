import express from 'express'
const router = express.Router()

//controller
import GamesController from '../controller/GamesController'

//routes
router.get('/games', GamesController.getGames)

export default router