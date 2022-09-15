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
                select: {
                    id: true,
                    gameId: true,
                    hourStart: true,
                    hourEnd: true,
                    name: true,
                    useVoiceChannel: true,
                    yearsPlaying: true,
                    weekDays: true,
                    game: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            
            return res.json(ads.map(ad => {
                return {
                    ...ad,
                    weekDays: ad.weekDays.split(',')
                }
            }))
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    },

    getDiscordByAdId: async( req: any, res: any) => {
        try {
            const { id } = req.params
            
            const ad = await prisma.ad.findUniqueOrThrow({ where: { id } })
            
            return res.json(ad.discord)
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    }   
}
export default AdsController