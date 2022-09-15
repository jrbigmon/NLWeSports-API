import express from 'express'
const router = express.Router()

//controller
import GamesController from '../controller/GamesController'

//routes
router.get('/games', GamesController.getGames)
router.get('/games/:id', GamesController.getGame)

export default router