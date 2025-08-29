"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciasBulk = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const provincias_model_1 = require("../models/provincias.model");
const ProvinciasBulk = async () => {
    try {
        const idPaisArgentina = new mongoose_1.default.Types.ObjectId("68a35c130759a3ab490cf493");
        const provincias = [
            { nombre: "Buenos Aires", idPais: idPaisArgentina },
            { nombre: "Capital Federal", idPais: idPaisArgentina },
            { nombre: "Catamarca", idPais: idPaisArgentina },
            { nombre: "Chaco", idPais: idPaisArgentina },
            { nombre: "Chubut", idPais: idPaisArgentina },
            { nombre: "Córdoba", idPais: idPaisArgentina },
            { nombre: "Corrientes", idPais: idPaisArgentina },
            { nombre: "Entre Ríos", idPais: idPaisArgentina },
            { nombre: "Formosa", idPais: idPaisArgentina },
            { nombre: "Jujuy", idPais: idPaisArgentina },
            { nombre: "La Pampa", idPais: idPaisArgentina },
            { nombre: "La Rioja", idPais: idPaisArgentina },
            { nombre: "Mendoza", idPais: idPaisArgentina },
            { nombre: "Misiones", idPais: idPaisArgentina },
            { nombre: "Neuquén", idPais: idPaisArgentina },
            { nombre: "Río Negro", idPais: idPaisArgentina },
            { nombre: "Salta", idPais: idPaisArgentina },
            { nombre: "San Juan", idPais: idPaisArgentina },
            { nombre: "San Luis", idPais: idPaisArgentina },
            { nombre: "Santa Cruz", idPais: idPaisArgentina },
            { nombre: "Santa Fe", idPais: idPaisArgentina },
            { nombre: "Santiago del Estero", idPais: idPaisArgentina },
            { nombre: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", idPais: idPaisArgentina },
            { nombre: "Tucumán", idPais: idPaisArgentina }
        ];
        await provincias_model_1.ProvinciasModel.deleteMany({ idPais: idPaisArgentina }); // Limpia provincias previas de Argentina
        await provincias_model_1.ProvinciasModel.insertMany(provincias);
        console.log("Provincias de Argentina insertadas correctamente.");
    }
    catch (error) {
        console.error("Error al insertar provincias:", error);
    }
};
exports.ProvinciasBulk = ProvinciasBulk;
//# sourceMappingURL=ProvinciaService.js.map