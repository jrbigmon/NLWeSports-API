"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import prisma to uselly how ORM
const client_1 = require("@prisma/client");
const convertHoursNumberToString_1 = require("../util/convertHoursNumberToString");
const convertHoursStringToNumber_1 = require("../util/convertHoursStringToNumber");
const addComaInString_1 = require("../util/addComaInString");
const changeWeekDaysNumberToString_1 = require("../util/changeWeekDaysNumberToString");
// instances prisma 
const prisma = new client_1.PrismaClient({
    log: ['query']
});
// controller to Ads
const AdsController = {
    // get all ads
    getAds: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ads = yield prisma.ad.findMany({
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
            });
            return res.json(ads.map(ad => {
                return Object.assign(Object.assign({}, ad), { hourStart: (0, convertHoursNumberToString_1.convertHoursNumberToString)(ad.hourStart), hourEnd: (0, convertHoursNumberToString_1.convertHoursNumberToString)(ad.hourEnd), weekDays: (0, changeWeekDaysNumberToString_1.getArrayAndAplyChangeNumberToString)(ad.weekDays.split(',')) });
            }));
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed access database' });
        }
    }),
    getAdsByGameId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id: gameId } = req.params;
            const ads = yield prisma.ad.findMany({
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
            });
            return res.json(ads.map(ad => {
                return Object.assign(Object.assign({}, ad), { hourStart: (0, convertHoursNumberToString_1.convertHoursNumberToString)(ad.hourStart), hourEnd: (0, convertHoursNumberToString_1.convertHoursNumberToString)(ad.hourEnd), weekDays: (0, changeWeekDaysNumberToString_1.getArrayAndAplyChangeNumberToString)(ad.weekDays.split(',')) });
            }));
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed access database' });
        }
    }),
    adCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { gameId, name, useVoiceChannel, weekDays, yearsPlaying, hourStart, hourEnd, discord } = req.body;
            const newAd = {
                gameId,
                name,
                useVoiceChannel,
                weekDays: (0, addComaInString_1.addComaInString)(weekDays),
                yearsPlaying,
                hourStart: (0, convertHoursStringToNumber_1.convertHoursStringToNumber)(hourStart),
                hourEnd: (0, convertHoursStringToNumber_1.convertHoursStringToNumber)(hourEnd),
                discord
            };
            const adAmount = yield prisma.ad.create({ data: newAd });
            return res.status(201).json(adAmount);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed access database' });
        }
    })
};
exports.default = AdsController;
