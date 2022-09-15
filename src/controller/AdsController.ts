// Import prisma to uselly how ORM
import { PrismaClient } from '@prisma/client'
// instances prisma 
const prisma = new PrismaClient()
// controller to Ads
const AdsController ={
    // get all ads
    getAds: (req: any, res: any) => {
        return res.json({msg: 'Hello World!'})
    }
}
export default AdsController