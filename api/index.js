"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
// Exportamos Express como función para que Vercel lo use en modo serverless
exports.default = (req, res) => {
    return (0, app_1.default)(req, res);
};
