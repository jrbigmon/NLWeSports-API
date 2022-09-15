// Import prisma to uselly how ORM
import { PrismaClient } from '@prisma/client'
// instances prisma 
const prisma = new PrismaClient({
    log: ['query']
})
// controller to Ads
const AdsController ={
    // get all ads
    getAds: async (req: any, res: any) => {
        try {
            const ads = await prisma.ad.findMany({
                include: {
                    game: {
                        select: { 
                            title: true 
                        }
                    }
                }
            })

            return res.json(ads)
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    },

    getAdsByGameId: async (req: any, res: any) => {
        try {
            const { id: gameId } = req.params

            const ads = await prisma.ad.findMany({
                where: { gameId },
                include: {
                    game: true
                }
            })
            
            return res.json(ads)
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    }
}
export default AdsController