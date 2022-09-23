"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//controller
const GamesController_1 = __importDefault(require("../controller/GamesController"));
//routes
router.get('/games', GamesController_1.default.getGames);
router.get('/games/:id', GamesController_1.default.getGame);
exports.default = router;
