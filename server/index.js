"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const init = require('./init.js');
init();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// middleware
const cors_1 = __importDefault(require("cors"));
const jwtAuth_1 = __importDefault(require("./middleware/jwtAuth"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(jwtAuth_1.default);
// test routes
app.get('/test', (req, res) => {
    res.status(200).json('/get api running');
});
app.post('/test', (req, res) => {
    res.status(200).json(req.body);
});
//
//user routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
app.use('/user', userRoutes_1.default);
app.use('/goal', goalRoutes_1.default);
const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Running on port ${port}`));
