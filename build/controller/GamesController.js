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
// instances prisma 
const prisma = new client_1.PrismaClient();
const GamesController = {
    getGames: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const games = yield prisma.game.findMany({
                include: {
                    _count: {
                        select: { ads: true }
                    },
                }
            });
            return res.json(games);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed access database' });
        }
    }),
    getGame: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const game = yield prisma.game.findUnique({ where: { id } });
            if (!game)
                return res.status(404).json({ message: 'No game found' });
            return res.json(game);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed access database' });
        }
    })
};
exports.default = GamesController;
