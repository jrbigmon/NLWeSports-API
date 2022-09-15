// Import prisma to uselly how ORM
import { PrismaClient } from '@prisma/client'
// instances prisma 
const prisma = new PrismaClient()
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
    }
}
export default AdsController