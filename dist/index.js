"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Asegúrate de que dotenv esté configurado para cargar las variables
const port = process.env.PORT || 3001; // Define el puerto, usa 3000 por defecto
app_1.default.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map