"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// instances
const port = 3000;
const baseURL = "/nlw/api";
//import middlewares
const cors_1 = __importDefault(require("cors"));
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
const AdsRouter_1 = __importDefault(require("./router/AdsRouter"));
const GamesRouter_1 = __importDefault(require("./router/GamesRouter"));
// run routes
app.use(baseURL, AdsRouter_1.default);
app.use(baseURL, GamesRouter_1.default);
// run server
app.listen(port, () => console.log('listening on port ' + port));
