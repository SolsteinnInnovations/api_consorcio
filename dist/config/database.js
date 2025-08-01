"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Asegúrate de que dotenv esté configurado para cargar las variables
const dbConnection = async () => {
    try {
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;
        const dbHost = 'consorciotest.z1wc3do.mongodb.net'; // Esta parte de la URL generalmente es constante para tu clúster
        if (!dbUser || !dbPassword || !dbName) {
            throw new Error('Faltan variables de entorno para la conexión a la base de datos (DB_USER, DB_PASSWORD, DB_NAME)');
        }
        // Construye la cadena de conexión usando las variables de entorno
        const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
        await mongoose_1.default.connect(connectionString);
        console.log('DB Online');
    }
    catch (error) {
        console.error('Error al iniciar la DB:', error);
        throw new Error('Error al iniciar la DB');
    }
};
exports.dbConnection = dbConnection;
