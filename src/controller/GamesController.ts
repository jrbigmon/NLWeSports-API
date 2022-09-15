// Import prisma to uselly how ORM
import { PrismaClient } from '@prisma/client'
// instances prisma 
const prisma = new PrismaClient()

const GamesController = {
    getGames: async (req: any, res: any) => {
        try {
            const games =  await prisma.game.findMany()
            
            return res.json(games)
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    },

    getGame: async (req: any, res: any) => {
        try {
            const { id } = req.params

            const game = await prisma.game.findUnique(id)

            if(!game) return res.status(404).json({message: 'No game found'})
            
            return res.json(game) 
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    }
}

export default GamesController