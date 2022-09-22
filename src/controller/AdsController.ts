// Import prisma to uselly how ORM
import { PrismaClient } from '@prisma/client'
import { convertHoursNumberToString } from '../util/convertHoursNumberToString'
import { convertHoursStringToNumber } from '../util/convertHoursStringToNumber'
import { addComaInString } from '../util/addComaInString'
import { getArrayAndAplyChangeNumberToString } from '../util/changeWeekDaysNumberToString'
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
                select: {
                    id: true,
                    discord: true,
                    gameId: true,
                    name: true,
                    yearsPlaying: true,
                    hourStart: true,
                    hourEnd: true,
                    weekDays: true,
                    useVoiceChannel: true,
                    game: true,
                },
                orderBy: { createdAt: 'desc' } 
            })

            return res.json(ads.map(ad => {
                return {
                    ...ad,
                    hourStart: convertHoursNumberToString(ad.hourStart),
                    hourEnd: convertHoursNumberToString(ad.hourEnd),
                    weekDays: getArrayAndAplyChangeNumberToString(ad.weekDays.split(','))
                }
            }))
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
                    discord: true,
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
                    hourStart: convertHoursNumberToString(ad.hourStart),
                    hourEnd: convertHoursNumberToString(ad.hourEnd),
                    weekDays: getArrayAndAplyChangeNumberToString(ad.weekDays.split(','))
                }
            }))
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    },
    
    adCreate: async (req: any, res: any) => {
        try {
            console.log(req.body)
            const {
                gameId,
                name,
                useVoiceChannel,
                weekDays,
                yearsPlaying,
                hourStart,
                hourEnd,
                discord 
            } = req.body

            const newAd = {
                gameId,
                name,
                useVoiceChannel,
                weekDays: addComaInString(weekDays),
                yearsPlaying,
                hourStart: convertHoursStringToNumber(hourStart),
                hourEnd: convertHoursStringToNumber(hourEnd),
                discord 
            }
            const adAmount = await prisma.ad.create({ data: newAd })

            return res.status(201).json(adAmount)
        } catch (error) {
            return res.status(500).json({message: 'Failed access database'})
        }
    }
}
export default AdsController