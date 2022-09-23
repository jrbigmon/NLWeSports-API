"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//express
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//controller
const AdsController_1 = __importDefault(require("../controller/AdsController"));
// routes
router.get('/ads', AdsController_1.default.getAds);
router.get('/games/:id/ads', AdsController_1.default.getAdsByGameId);
router.post('/ads', AdsController_1.default.adCreate);
exports.default = router;
